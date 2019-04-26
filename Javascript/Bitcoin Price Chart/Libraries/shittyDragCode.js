function moo() { console.log('moo'); }








function initializeChart() {
	// Set up namespace variable (why?)
	var svgNamespace = "http://www.w3.org/2000/svg";
	
	// Create background
	var backgroundFill = document.createElementNS(svgNamespace, 'rect');
	backgroundFill.setAttribute('fill', '#111');
	backgroundFill.setAttribute('width', '900px');
	backgroundFill.setAttribute('height', '600px');
	backgroundFill.id = 'backgroundFill';
	subcontainerSVG.appendChild(backgroundFill);
	
	// Create vertical grid lines
	for (var q=0; q<800; q+=150) {
		var verticalLine = document.createElementNS(svgNamespace, 'line');
		verticalLine.setAttribute('stroke', '#333');
		verticalLine.setAttribute('x1', q - 1);
		verticalLine.setAttribute('x2', q - 1);
		verticalLine.setAttribute('y1', 0);
		verticalLine.setAttribute('y2', 600);
		verticalLine.classList.add('svgLine');
		subcontainerSVG.appendChild(verticalLine);
	}
	
	// Create horizontal grid lines
	for (var q=0; q<600; q+=50) {
		var horizontalLine = document.createElementNS(svgNamespace, 'line');
		horizontalLine.setAttribute('stroke', '#333');
		horizontalLine.setAttribute('x1', 0);
		horizontalLine.setAttribute('x2', 900);
		horizontalLine.setAttribute('y1', q - 1);
		horizontalLine.setAttribute('y2', q - 1);
		horizontalLine.classList.add('svgLine');
		subcontainerSVG.appendChild(horizontalLine);
	}

	// Dragging the canvas
	$( function() {
		$( "#draggable" ).draggable();
	} );
	// Functions are located at the end of this file, for scoping reasons
	// backgroundFill.setAttribute('onmousedown', 'enableDrag()');
// 	backgroundFill.setAttribute('onmouseup', 'disableDrag()');
}








// Dragging the canvas
// Pseudocode:
// onMouseDown, enable listening for MouseMove
// onMouseUp, remove this listener
// function enableDrag() { document.body.addEventListener('mousemove', drag); }
// function disableDrag() { document.body.removeEventListener('mousemove', drag); }
//
// // Init variables
// var currentGridPositionX = 0;
// var currentGridPositionY = 0;
// var dragModX = 0;
// var dragModY = 0;
// var dragTimeDelay = false;
//
// function drag(e) {
// 	if (dragTimeDelay === false) {
// 		// Drag left
// 		if (e.pageX < currentGridPositionX) { dragModX -= 1; activateDragX = true; }
// 		// Drag right
// 		else if (e.pageX > currentGridPositionX) { dragModX += 1; activateDragX = true; }
// 		// Drag up
// 		if (e.pageY < currentGridPositionY) { dragModY -= 1; activateDragY = true; }
// 		// Drag down
// 		else if (e.pageY > currentGridPositionY) { dragModY += 1; activateDragY = true; }
//
// 		// Perform the drag, if needed
// 		if (activateDragX == true) {
// 			var elements = document.getElementsByClassName('svgLine');
// 			for (var i = 0; i < elements.length; i++) {
// 				var q = elements[i].x1.baseVal.value;
// 				var r = elements[i].x2.baseVal.value;
// 				elements[i].setAttribute('x1', q + dragModX);
// 				elements[i].setAttribute('x2', r + dragModX);
// 			}
// 		}
//
// 		if (activateDragY == true) {
// 			var elements = document.getElementsByClassName('svgLine');
// 			for (var i = 0; i < elements.length; i++) {
// 				var q = elements[i].y1.baseVal.value;
// 				var r = elements[i].y2.baseVal.value;
//     			elements[i].setAttribute('y1', q + dragModY);
//     			elements[i].setAttribute('y2', r + dragModY);
// 			}
// 		}
//
// 		// Reset variables for the next frame
// 		currentGridPositionX = e.pageX;
// 		currentGridPositionY = e.pageY;
// 		activateDragX = false;
// 		activateDragY = false;
// 		dragTimeDelay = true;
//
// 		// Prevent this from firing at 60000 FPS
// 		setTimeout('dragTimeDelay = false', 50);
// 	}
// }