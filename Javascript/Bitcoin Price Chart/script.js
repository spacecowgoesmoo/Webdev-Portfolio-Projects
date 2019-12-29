// Global Variables
var cow = {
	// Set up namespace variable (why?)
	svgNamespace: "http://www.w3.org/2000/svg",
	// For storing data from the APIs
	coinbaseData: [],
	smaYpointsOnscreen: [],
	smaPoints50: [],
	smaPoints100: [],
	smaPoints200: [],
	// Used for making the Y axis accurate
	priceSpread: 0,			// Range of prices visible onscreen
	priceMin: 0,			// Lowest point visible onscreen
	priceMax: 0,			// Highest point visible onscreen
	dollarsPerPixel: 0,
	// Date variable for use by the X axis labels
	cowDate: new Date,
	// Used for tracking if the date rolls over while the chart is displaying minutes
	dateTracker: '',
	// Self explanatory
	numberOfCandles: 300,
	currentCurrency: 'btc',
	iframeWidth: 0,
	iframeHeight: 0,
	// Tracks X location on the viewport
	xPosition: 2552,
	// Tracks which candle is the leftmost one onscreen
	indexOfOnscreenCandles: 0,
	// Keeps the cursor event from murdering the CPU
	allowCursorMove: false,
	allowCursorHide: true,
	// Tracks cursor with jQuery
	cursorX: 0,
	cursorY: 0,
	// Prevents the mouseout/mousedown fallback from creating duplicate candles
	allowMouseoutRedraw: false
};




// Utility functions
function preventParentClick(e) {				// You need to pass the string 'event' as e or this won't work in Firefox
	if (!e) var e = window.event;
	if (e.stopPropagation) e.stopPropagation();	// Lots of redundancy here because I was trying to fix a bug in Transcend
	e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	e.stopImmediatePropagation();
}

function roundTo(input, target) { return Math.round(input / target) * target; }

function moo() { console.log('moo'); }

function deleteAllOfClass(q) {
	// IMPORTANT: We have to iterate the loops backwards, because the HTMLCollection updates itself instantly on every action
	// Meaning that the element indices change midloop, meaning that half of the get skipped
	var q = document.getElementsByClassName(q);
	for (let r=q.length; r>0; r--) { q[0].remove(); }
}

// Time button functionality goes here instead of the HTML, because basic onClick doesn't work on iOS
$(document).ready(function(){
    $('.miniTESbutton').on('click touchstart', function() {
        clearAllReloadAndRedraw(this.id, cow.currentCurrency);
    });
});

function initialize() {
	initializeJqueryListeners();

	loadPriceDataAndRedraw('1dButton', 'btc');			// Also draws candles and price texts

	updateBottomPaneLocation();
	drawVerticalLines();
	drawHorizontalLines();
}
















function initializeJqueryListeners() {
	// Dragging the canvas, using jQueryUI
	// Initializes this class as draggable, and sets option flags
	$( ".draggable" ).draggable({
		axis: "x",
		//containment: [ 0, 0, 2552, 0 ]				// Maximum width, as designated by the HTML/CSS
		containment: [ 0, 0, 1800, 0 ]					// Optimal width, to prevent the need to rubberband the view at the far side
	});

	// Hide the cursor when dragging begins
	$( ".draggable" ).on( "dragstart", function( event, ui ) {
		hideCursor();
		cow.allowMouseoutRedraw = true;
	});

	// Get mouse coordinates
	// There's simpler vanilla JS ways to do this, but this also polyfills for IE11
	$( ".draggable" ).on( "mousemove", function( event ) {
	  cow.cursorX = event.pageX;
	  cow.cursorY = event.pageY;
	});

	// Get window sizes
	getWindowSize();
	let resizeTimer;
	// And resample them on resize
	// The extra timeout stuff makes this only fire once, after resizing has stopped for 200 milliseconds
	$( window.parent ).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			// Run code here, now that resizing has "stopped"
	  		getWindowSize();
			updateBottomPaneLocation();
			deleteAllOfClass('svgTimeText');
			deleteAllOfClass('bgVerticalLine');
			drawTimeMarkers();
			drawVerticalLines();
            deleteAndRedrawScrolledCandles();
			initializeCursorLines();
		}, 200);
	});

	// Force a redraw if the user exits the window before resolving a mousedown
	$(".chartBody").mousedown(function() {
		$(this).addClass('imclicked');
		}).mouseleave(function() {
			if($(this).hasClass('imclicked')) {
				if (cow.allowMouseoutRedraw == true) {
					cow.allowMouseoutRedraw = false;
					mouseupCursorStuff();
					moveCursor();
					hideCursor();
					$(this).removeClass('imclicked');
				}
		}
	});
}

function getWindowSize() {
	if (window.parent.innerWidth < 900) { cow.iframeWidth = window.parent.innerWidth - 44; }
		else { cow.iframeWidth = 900; }
	if (window.parent.innerHeight < 600) { cow.iframeHeight = window.parent.innerHeight - 44; }
		else { cow.iframeHeight = 600; }
}

function updateBottomPaneLocation() {
	bottomPane.style.bottom = (600 - cow.iframeHeight);
}

function mouseupCursorStuff() {
	// Sets up X,Y tracking for dragging
	// Starts at X=-2552, scrolls left up to X=0
	// Value is inverted for human readability
	//
	// Defaults to the right frame, with three more screens to the left. Image: ...[.]
	// NOTE: getBoundingClientRect().x also works, but it returns NaN in IE11, Edge, iOS, and older Webkit browser versions
	cow.xPosition = containerSVG.getBoundingClientRect().left * -1;

	// Other cursor stuff
	// PS: Fuck firefox for making me refactor this function from like three different places
	deleteAndRedrawScrolledCandles();
	initializeCursorLines();				// TODO - Use z-index instead of repeated cursor respawning
	respawnCursor();						// But SVG z-index doesn't exist yet :(
}
















function initializeCursorLines() {
	// DELETE the lines if they exist already
	// We're redrawing these so that they stay on top of the candles (z index)
	const zzz = document.getElementById("cursorVline");
 	if (zzz !== null) {
		containerSVG.removeChild(cursorVline);
		containerSVG.removeChild(cursorHline);
		rightPane.removeChild(cursorPriceBorder);
		rightPane.removeChild(cursorPriceFill);
		rightPane.removeChild(cursorPriceText);
	}

	// Solid vertical line. Looks bad
	// var verticalLine = document.createElementNS(cow.svgNamespace, 'rect');
	// verticalLine.setAttribute('fill', '#9D9328');
	// verticalLine.setAttribute('width', 1);
	// verticalLine.setAttribute('height', 550);
	// verticalLine.setAttribute('x', 1000000);
	// verticalLine.setAttribute('y', 0);
	// verticalLine.classList.add('svgLine');
	// verticalLine.id = 'cursorVline';
	// containerSVG.appendChild(verticalLine);

	// Create parent for the dotted vertical lines
	const vLineContainer = document.createElementNS(cow.svgNamespace, 'svg');
	vLineContainer.setAttribute('width', 10);
	vLineContainer.setAttribute('height', 550);
	vLineContainer.id = 'cursorVline';
	containerSVG.appendChild(vLineContainer);

	// Draw dotted vertical lines
	for (let q=0; q<55; q++) {
		const verticalLine = document.createElementNS(cow.svgNamespace, 'rect');
		verticalLine.setAttribute('fill', '#9D9328');
		verticalLine.setAttribute('width', 1);
		verticalLine.setAttribute('height', 5);
		verticalLine.setAttribute('x', 0);
		verticalLine.setAttribute('y', q*10);
		verticalLine.classList.add('svgLine');
		vLineContainer.appendChild(verticalLine);
	}

	// Draw solid horizontal line
	const horizontalLine = document.createElementNS(cow.svgNamespace, 'rect');
	horizontalLine.setAttribute('fill', '#9D9328');
	horizontalLine.setAttribute('width', 3382);
	horizontalLine.setAttribute('height', 1);
	horizontalLine.setAttribute('x', 0);
	horizontalLine.setAttribute('y', 1000000);
	horizontalLine.classList.add('svgLine');
	horizontalLine.id = 'cursorHline';
	containerSVG.appendChild(horizontalLine);

	// Draw price cursor border
	const pcb = document.createElementNS(cow.svgNamespace, 'rect');
	pcb.setAttribute('fill', '#9D9328');
	pcb.setAttribute('width', 70);
	pcb.setAttribute('height', 20);
	pcb.setAttribute('x', 0);
	pcb.setAttribute('y', 1000000);
	pcb.id = 'cursorPriceBorder';
	rightPane.appendChild(pcb);

	// Draw price cursor fill
	const pcf = document.createElementNS(cow.svgNamespace, 'rect');
	pcf.setAttribute('fill', '#16384A');
	pcf.setAttribute('width', 68);
	pcf.setAttribute('height', 18);
	pcf.setAttribute('x', 1);
	pcf.setAttribute('y', 1000000);
	pcf.id = 'cursorPriceFill';
	rightPane.appendChild(pcf);

	// Draw price cursor text
	// Probably doesn't need to be SVG..
	const pct = document.createElementNS(cow.svgNamespace, 'text');
	pct.setAttribute('x', 10);
	pct.setAttribute('y', 1000000);
	pct.setAttribute('fill', '#9D9328');
	pct.id = 'cursorPriceText';
	rightPane.appendChild(pct);
}




function moveCursor(e) {
	// This function is called at the mouse's FPS, so make sure it's always super efficient
	// The third thing checks if the cursor has been created yet
	if (cow.allowCursorMove == true && cow.allowCursorHide == true && document.getElementById("cursorVline")) {
		// Get mouse coordinates
		// This doesn't work with IE11, so we've rewritten it in initializeJqueryListeners() instead
		// var x = e.clientX;
		// var y = e.clientY;

		// Hide the cursor if the cursor hovers over the date texts at the bottom
		if (cow.cursorY >= (cow.iframeHeight - 50)) { cow.cursorX=1000000; cow.cursorY=1000000; }

		// Move the cursor
		cursorVline.setAttribute('x', roundTo((cow.cursorX + cow.xPosition), 9));
		cursorHline.setAttribute('y', cow.cursorY);
		cursorPriceBorder.setAttribute('y', cow.cursorY-10);
		cursorPriceFill.setAttribute('y', cow.cursorY-9);
		cursorPriceText.setAttribute('y', cow.cursorY+5);
		cursorPriceText.textContent = '$' + (((cow.iframeHeight - 50) - cow.cursorY) * cow.dollarsPerPixel + cow.priceMin).toFixed(0);

		// Close the FPS throttle
		cow.allowCursorMove = false;

		// Reopen it on a delay
		setTimeout("cow.allowCursorMove = true;", 50);
	}
}




function hideCursor() {
	if (cow.allowCursorHide == true) {
		cursorVline.setAttribute('x', 1000000);
		cursorHline.setAttribute('y', 1000000);
		cursorPriceBorder.setAttribute('y', 1000000);
		cursorPriceFill.setAttribute('y', 1000000);
		cursorPriceText.setAttribute('y', 1000000);
		cow.allowCursorMove = false;
		cow.allowCursorHide = false;
	}
}




function respawnCursor() {
	cow.allowCursorMove = true;
	cow.allowCursorHide = true;
}
















// Draw vertical grid lines, drawing from right to left
function drawVerticalLines() {
	for (let q=23; q>0; q-=1) {
		let qPixels = 2478 + cow.iframeWidth - ((23 - q) * 147);
		qPixels = roundTo(qPixels, 9);

		const verticalLine = document.createElementNS(cow.svgNamespace, 'rect');
		verticalLine.setAttribute('fill', '#1E465B');
		verticalLine.setAttribute('x', qPixels);
		verticalLine.setAttribute('y', 0);
		verticalLine.setAttribute('width', 1);
		verticalLine.setAttribute('height', 550);
		verticalLine.classList.add('bgVerticalLine');
		containerSVG.appendChild(verticalLine);
	}
}




// Draw horizontal grid lines
function drawHorizontalLines() {
	for (let q=0; q<12; q+=1) {
		const qPixels = q * 50;

		const horizontalLine = document.createElementNS(cow.svgNamespace, 'rect');
		horizontalLine.setAttribute('fill', '#1E465B');
		horizontalLine.setAttribute('x', 0);
		horizontalLine.setAttribute('y', qPixels - 1);
		horizontalLine.setAttribute('width', 3382);
		horizontalLine.setAttribute('height', 1);
		horizontalLine.classList.add('bgHorizontalLine');
		containerSVG.appendChild(horizontalLine);
	}
}




// Draw time markers
function drawTimeMarkers(timescale) {
	let timescaleToDays;
	switch (timescale) {
		case '1dButton': 	timescaleToDays = '7days'; 	break;
		case '1hButton': 	timescaleToDays = 60; 		break;
		case '15mButton': 	timescaleToDays = 15; 		break;
		case '5mButton': 	timescaleToDays = 5; 		break;
		case '1mButton': 	timescaleToDays = 1; 		break;
		default: break;
	}

	for (let q=22; q>0; q-=1) {											// NOTE - r.getMonth is base zero. Use +1
		// Basic method, for cow.iframeWidth == 900 only
		//let qPixels = q * 147;

		let qPixels = 2478 + cow.iframeWidth - ((23 - q) * 147);
		qPixels = roundTo(qPixels, 9);

		if (timescaleToDays == '7days') {
			const r = ((-q+23) * 16).days().ago();						// Grab the date for the next draw
			cow.cowDate = (r.getMonth() + 1) + ' / ' + r.getDate();		// Increment the global variable
		} else {
			// Else, we track it by minutes
			const r = ((-q+23) * timescaleToDays * 16).minutes().ago();	// Grab the date for the next draw
			const hours = r.getHours();
			let minutes = r.getMinutes();
			if (minutes.toString().length < 2) { minutes = '0' + minutes; }// Add leading zeroes to 10:04, for example
			cow.cowDate = hours + ':' + minutes;						// Increment the global variable

			if (r.getDate() != cow.dateTracker && q < 22) {				// If the date has changed from the last draw.. (&& skip first time)
				cow.cowDate = (r.getMonth() + 1) + ' / ' + r.getDate();	// Display the date instead
			}

			cow.dateTracker = r.getDate();								// Reset the variable to track it next time
		}

		const timeText = document.createElementNS(cow.svgNamespace, 'text');
		// Draw text
		timeText.textContent = cow.cowDate;
		timeText.classList.add('svgTimeText');

		// Generate element
		bottomPane.appendChild(timeText);

		// Get text offset (only works after the DOM element has been appended/created)
		// This changes the text from align-left to align-center
		const textOffset = timeText.getBBox().width / 2;

		// Place element
		timeText.setAttribute('x', qPixels - textOffset);
		timeText.setAttribute('y', 20);
	}
}




// Draw price markers
function drawPriceMarkers() {
	var numberOfMarkers = Math.floor(((cow.iframeHeight - 75) / 50).toFixed(0));

	for (let q=0; q<numberOfMarkers; q+=1) {
		const qPixels = (q * 50) + 54;

		//const z = cow.priceMax - (cow.priceSpread / numberOfMarkers) * (q + 1);	// Works, but is only accurate on chart multiples of 50 px
		const z = cow.priceMax - ((q + 1) * 50 * cow.dollarsPerPixel);				// Accurate to the pixel

		const priceText = document.createElementNS(cow.svgNamespace, 'text');
		priceText.setAttribute('x', 10);
		priceText.setAttribute('y', qPixels);
		priceText.textContent = '$' + z.toFixed(0);
		priceText.classList.add('svgPriceText');
		rightPane.appendChild(priceText);
	}
}
















function hideLoadingText() { loadingText.style.display='none'; }
function showLoadingText() { loadingText.style.display='block'; }

function loadNewCurrency(currency) {
	//document.getElementById("containerSVG").focus();		// Remove focus from the select-box element
	$( "containerSVG" ).focus();							// The vanilla focus() kills IE. This one is at least ignored, and works in Edge
	cow.currentCurrency = currency;
	clearAllReloadAndRedraw('1dButton', currency);
}
















function clearAllReloadAndRedraw(timescale, currency) {
	showLoadingText();

	// Enable all buttons
	document.getElementById('1dButton').disabled = false;
	document.getElementById('1hButton').disabled = false;
	document.getElementById('15mButton').disabled = false;
	document.getElementById('5mButton').disabled = false;
	document.getElementById('1mButton').disabled = false;

	// Disable the clicked button
	document.getElementById(timescale).disabled = true;

	// Delete all the candles and texts
	deleteAllOfClass('smaPolyline');
	deleteAllOfClass('svgCandle');
	deleteAllOfClass('svgTimeText');
	deleteAllOfClass('svgPriceText');

	// Reset the chart to the beginning
	resetBackToStartOfChart();

	// Load the Coinbase data and redraw everything. The main loop is in here
	loadPriceDataAndRedraw(timescale, currency);
}




function resetBackToStartOfChart() {
	dragContainer.style.left = 0;
	cow.xPosition = 2552;
	getOnscreenSMA();
}




function loadPriceDataAndRedraw(timescale, currency) {
	// Set timescale for the API call (numbers are in seconds)
	let t;
	switch (timescale) {
		case '1dButton': 	t = 86400;	break;
		case '1hButton': 	t = 3600; 	break;
		case '15mButton': 	t = 900; 	break;
		case '5mButton': 	t = 300; 	break;
		case '1mButton': 	t = 60; 	break;
		default: break;
	}

	// Format selected currency
	const c = currency.toUpperCase();

	// Get start and end dates
	// NOTE: Date manipulation is using date.js
	// ISO 8601 format
	// Coinbase requires both start and end or it ignores them both, for some reason
	// url1 is what appears onLoad. url2 is the older data for the SMAs
	let end1 = new Date		// aka, the exact second the page is loaded. No changes required
	let start1end2 = new Date
	let start2 = new Date
	switch (timescale) {
		case '1dButton': 	start1end2.addDays(-300); 		start2.addDays(-600); 		break;
		case '1hButton': 	start1end2.addHours(-300); 		start2.addHours(-600); 		break;
		case '15mButton': 	start1end2.addMinutes(-4500); 	start2.addMinutes(-9000); 	break;
		case '5mButton': 	start1end2.addMinutes(-1500); 	start2.addMinutes(-3000); 	break;
		case '1mButton': 	start1end2.addMinutes(-300); 	start2.addMinutes(-600);	break;
		default: break;
	}

	// Stringify the dates
	end1 = end1.toISOString()
	start1end2 = start1end2.toISOString()
	start2 = start2.toISOString()

	// Load price data from Coinbase Pro
	const url1 = 'https://api.pro.coinbase.com/products/' + c + '-USD/candles?start=' + start1end2 + '&end=' + end1 + '&granularity=' + t;
 	const url2 = 'https://api.pro.coinbase.com/products/' + c + '-USD/candles?start=' + start2 + '&end=' + start1end2 + '&granularity=' + t;
	const urlCurrent = 'https://api.pro.coinbase.com/products/' + c + '-USD/ticker';

	// GET the two datasets in order, then calculate the current price, then perform the rest of the code:
	// GETs are nested to make them load in the intended order
	$.get(url1, function(data1) {
		cow.coinbaseData = data1;

		$.get(url2, function(data2) {
   			cow.coinbaseData = cow.coinbaseData.concat(data2);			

			$.get(urlCurrent, function(data3) {
				const q = Number(data3.price);											// Get up-to-the-second price
				const currentPrice = [0, q, q, cow.coinbaseData[0][4], q, 0];			// Prepare the array entry, shortcuts used for low/high
				cow.coinbaseData.unshift(currentPrice);									// Add it to cow.coinbaseData
				// NOTE ON ABOVE CODE: I'm not sure why low/high seem to produce accurate results with q just plugged into both of them
				// I did that because having them at 0 was wrecking the chart scaling
				
				cow.smaPoints50 = [];									// MASTER FUNCTION LIST
				cow.smaPoints100 = [];
				cow.smaPoints200 = [];
            	
				calculateSMA(50);										// Precalculate the SMA arrays
   				calculateSMA(100);
   				calculateSMA(200);
				getOnscreenSMA();
            	
   				calculateCandleVariables();  							// Precalculate a bunch of data
            	
   				deleteAllOfClass('smaPolyline');						// Draw the SMAs from the previously calculated data
   				drawSMA(50, '#00FFFF');
   				drawSMA(100, '#00BBFF');
   				drawSMA(200, '#0077FF');
            	
   				deleteAllOfClass('svgTimeText');						// Draw the X axis timescale
   				drawTimeMarkers(timescale);
            	
   				deleteAllOfClass('svgCandle');							// Draw the candles
   				drawCandles(true);
            	
   				deleteAllOfClass('svgPriceText');						// Draw the Y axis price markers
   				drawPriceMarkers();
            	
   				hideLoadingText();										// Final checks
   				initializeCursorLines();
				console.log(cow);
			});
   		});
	});
}




function calculateSMA(sampleSize) {
	// Get chart position
	const arrayStartingPosition = (2552 - cow.xPosition) / 9;
	const ASP = arrayStartingPosition.toFixed(0) * 1;		// Accuracy drifts by one candle towards the very end of the chart, but that's fine
															// This breaks without the *= 1 for some reason

	for (let q=cow.numberOfCandles; q>0; q--) {										// For each candle..
		let sum = 0;
		for (let i=0; i<sampleSize; i++) { 											// ..for the requested number of sampleSize..
			if (cow.coinbaseData[q+i] != null) { sum += cow.coinbaseData[q+i][4]; }	// ..calculate the sum of the past X price closes
		}
		const smaPoint = sum / sampleSize;											// Then take the average
		cow['smaPoints'+sampleSize].unshift(smaPoint);								// Add the point to the array
	}
}




function getOnscreenSMA() {
	// Get chart position
	const arrayStartingPosition = (2552 - cow.xPosition) / 9;
	const ASP = arrayStartingPosition.toFixed(0) * 1;					// Accuracy drifts by one candle towards the very end of the chart, but that's fine
																		// This breaks without the *= 1 for some reason
	
	const onscreenCandles = cow.iframeWidth / 9;
	
	cow.smaYpointsOnscreen = [];										// Clear the global variable

	for (let q=cow.numberOfCandles; q>0; q--) {							// For each candle..
		if (q < ASP + onscreenCandles && q > ASP) { 					// ..if it's onscreen..
			cow.smaYpointsOnscreen.push(cow.smaPoints50[q]);			// ..add the point from all three SMAs to the Array.
			cow.smaYpointsOnscreen.push(cow.smaPoints100[q]);
			cow.smaYpointsOnscreen.push(cow.smaPoints200[q]);
		 }
	}
}




function calculateCandleVariables() {
	// Get chart position
	const arrayStartingPosition = (2552 - cow.xPosition) / 9;
	const ASP = arrayStartingPosition.toFixed(0) * 1;		// Accuracy drifts by one candle towards the very end of the chart, but that's fine
															// This breaks without the *= 1 for some reason

	// Detect number of onscreen candles. Allows the chart to draw with a variable amount of data
	cow.indexOfOnscreenCandles = cow.coinbaseData.length - ASP;
	if (cow.indexOfOnscreenCandles > 90) { cow.indexOfOnscreenCandles = 90 + ASP - (((900 - cow.iframeWidth) / 9).toFixed(0)); }
		//									---------Basic calculation here------	-----This part does squishable window size---

	// Abort if there is zero onscreen data, or if there is less than one screen of available data
	if (cow.indexOfOnscreenCandles < ASP || cow.indexOfOnscreenCandles > cow.numberOfCandles) {
		// Reset the chart to a point just before the end.
		// This feature has been deprecated, but the safety check is still important
		// dragContainer.style.left = 1800;
		// cow.xPosition = 750;
	} else {

		// Set cow.priceMin
		let tempArray = [];
		for (i=ASP; i<cow.indexOfOnscreenCandles; i++) { tempArray.push(cow.coinbaseData[i][1]); }	// Create array of all the candle lows onscreen
		tempArray = tempArray.concat(cow.smaYpointsOnscreen);									// Add in the SMA Y data
		cow.priceMin = Math.min.apply(Math, tempArray);											// Find the highest one

		// Set cow.priceMax
		tempArray = [];
		for (i=ASP; i<cow.indexOfOnscreenCandles; i++) { tempArray.push(cow.coinbaseData[i][2]); }	// Create array of all the candle highs onscreen
		tempArray = tempArray.concat(cow.smaYpointsOnscreen);									// Add in the SMA Y data
		cow.priceMax = Math.max.apply(Math, tempArray);											// Find the highest one

		// Set cow.priceSpread
		cow.priceSpread = cow.priceMax - cow.priceMin;
		if (cow.priceSpread < 0) { cow.priceSpread = cow.priceSpread * -1; }

		// Set cow.dollarsPerPixel
		cow.dollarsPerPixel = cow.priceSpread / (cow.iframeHeight - 50);
	}
}




function drawSMA(sampleSize, color) {
	// Draw data to the chart, from present to past
	// The data array is also ordered from present to past
	const numberOfCandles = cow.numberOfCandles -1;												// Compensates for index beginning at zero

	const smaPolyline = document.createElementNS(cow.svgNamespace, 'polyline');					// Create SVG element
	let pointSet = "";																			// Prepare point container variable

	for (let q=numberOfCandles; q>0; q--) {
		const inverter = cow.priceMax;											// This is a bunch of y-axis code copypasted from convertDollarsToPixels()
		const expander = (cow.priceMin / cow.priceSpread) + 1;					//////////
		let pixels = (inverter - cow['smaPoints'+sampleSize][q]) * expander;	//////////
		pixels = Math.round((pixels / cow.priceMax) * (cow.iframeHeight - 50)); //////////

		const qPixels = 2480 + cow.iframeWidth - (q * 9);										// Calculate X coordinate
		pointSet += roundTo(qPixels, 9) - 2 + " " + pixels + ", ";								// Add point to the point container
	}
	pointSet = pointSet.slice(0, -2)															// Remove trailing comma

	smaPolyline.setAttribute('points', pointSet);												// Attach attributes to the SVG
	smaPolyline.setAttribute('stroke', color);
	smaPolyline.setAttribute('stroke-width', 2);
	smaPolyline.setAttribute('fill', "none");
	smaPolyline.classList.add('smaPolyline');
	containerSVG.appendChild(smaPolyline);														// Append the SVG to the page
}




function drawCandles(backToStart) {
	// Chart formula pieces. IMPORTANT!
	// Note: We manipulate this number as $$$, then as pixels after the switch(). Know which one it is at all times or it will break
	const inverter = cow.priceMax;							// This inverts the $$$ Y axis because pixels are drawn vertically from the top
	const expander = (cow.priceMin / cow.priceSpread) + 1;	// This is the main formula for expanding a graph to fit cow.priceSpread

	function convertDollarsToPixels(q, item) {
		let pixels;
		let scale550;
		switch (item) {										// These are the value calculations in $$$
			case 'greenY': 		pixels = (inverter - cow.coinbaseData[q][4]) * expander;	scale550 = true; 	break;
			case 'redY': 		pixels = (inverter - cow.coinbaseData[q][3]) * expander;	scale550 = true; 	break;
			case 'wickY': 		pixels = (inverter - cow.coinbaseData[q][2]) * expander;	scale550 = true; 	break;
			case 'greenHeight': pixels = cow.coinbaseData[q][4] - cow.coinbaseData[q][3];	scale550 = false; 	break;
			case 'redHeight': 	pixels = cow.coinbaseData[q][3] - cow.coinbaseData[q][4];	scale550 = false; 	break;
			case 'wickHeight':  pixels = cow.coinbaseData[q][2] - cow.coinbaseData[q][1]; 	scale550 = false; 	break;
			default: break;
		}
		if (scale550 == true) 	{ pixels = (pixels / cow.priceMax) * (cow.iframeHeight - 50); }				// Converts $$$ to pixels
		else 					{ pixels = (pixels / cow.dollarsPerPixel); }
		return pixels;
	}


	// Draw data to the chart, from present to past
	// The data array is also ordered from present to past
	const numberOfCandles = cow.numberOfCandles -1;												// Compensates for index beginning at zero

	for (let q=numberOfCandles; q>0; q--) {
		const qPixels = 2478 + cow.iframeWidth - (q * 9);

		// Open and Close
		const priceCandleBody = document.createElementNS(cow.svgNamespace, 'rect');
		priceCandleBody.setAttribute('x', roundTo(qPixels, 9) - 2);
		priceCandleBody.setAttribute('width', 5);
		if (cow.coinbaseData[q][4] > cow.coinbaseData[q][3]) {									// Green candle
			priceCandleBody.setAttribute('y', convertDollarsToPixels(q, 'greenY'));				// Close price, top half of rect
			priceCandleBody.setAttribute('height', convertDollarsToPixels(q, 'greenHeight'));	// Open price, bottom
		}
		if (cow.coinbaseData[q][4] < cow.coinbaseData[q][3]) {									// Red candle
			priceCandleBody.setAttribute('y', convertDollarsToPixels(q, 'redY'));				// Open price, top half of rect
			priceCandleBody.setAttribute('height', convertDollarsToPixels(q, 'redHeight'));		// Close price, bottom
		}
		priceCandleBody.classList.add('svgCandle');
		containerSVG.appendChild(priceCandleBody);

		// High and Low
		const priceCandleWick = document.createElementNS(cow.svgNamespace, 'rect');
		priceCandleWick.setAttribute('x', roundTo(qPixels, 9));
		priceCandleWick.setAttribute('width', 1);
		priceCandleWick.setAttribute('y', convertDollarsToPixels(q, 'wickY'));					// High, top of rect
		priceCandleWick.setAttribute('height', convertDollarsToPixels(q, 'wickHeight'));		// Low, bottom of rect
		priceCandleWick.classList.add('svgCandle');
		containerSVG.appendChild(priceCandleWick);

		// Colorize the candle
		if (typeof cow.coinbaseData[q+1] !== 'undefined') {				// Only do this if the next (q+1) data point exists
			if (cow.coinbaseData[q][4] > cow.coinbaseData[q+1][4]) {	// Prevents crashes for newly added coins like BCH, under ~160 days
				priceCandleBody.setAttribute('fill', '#149054');	// Green
				priceCandleWick.setAttribute('fill', '#149054');
			} else {
				priceCandleBody.setAttribute('fill', '#FF4E31');	// Red
				priceCandleWick.setAttribute('fill', '#FF4E31');
			}
		} else {
			containerSVG.removeChild(priceCandleBody);		// If there's no (q+1) data point, DELETE the first candle
			containerSVG.removeChild(priceCandleWick);		// We could also colorize it based on its own data, but.. not much ROI on effort
		}
	}
}

















function deleteAndRedrawScrolledCandles() {
	getOnscreenSMA();

	calculateCandleVariables();  							// Precalculate a bunch of data

	deleteAllOfClass('smaPolyline');
	drawSMA(50, '#00FFFF');
	drawSMA(100, '#00BBFF');
	drawSMA(200, '#0077FF');
	
	deleteAllOfClass('svgCandle');
	drawCandles();
	
	deleteAllOfClass('svgPriceText');
	drawPriceMarkers();
}















// API DOCUMENTATION
// https://api.pro.coinbase.com//products/BTC-USD/candles?granularity=86400
// Time granularity is in seconds
// [
//     [ time, low, high, open, close, volume ],
//     [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ],
//     ...
// ]




// Binance API
// Works, but is limited to 4 months of data per request
// Coinbase is better because it's a fixed 300 data points per request
//
// https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1M
// https://www.binance.com/restapipub.html
//
// Resulting nested array:
// 			1499040000000,      // Open time
// 		    "0.01634790",       // Open
// 		    "0.80000000",       // High
// 		    "0.01575800",       // Low
// 		    "0.01577100",       // Close
// 		    "148976.11427815",  // Volume
// 		    1499644799999,      // Close time
// 		    "2434.19055334",    // Quote asset volume
// 		    308,                // Number of trades
// 		    "1756.87402397",    // Taker buy base asset volume
// 		    "28.46694368",      // Taker buy quote asset volume
// 		    "17928899.62484339" // Can be ignored
