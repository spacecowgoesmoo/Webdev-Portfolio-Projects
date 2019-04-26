// BasicAudioButton.js
// © Taylor Calderone, 2017
// v1.1

// INSTRUCTIONS
// 1. Prepare some play/pause/loading button images
// 2. Set up the image sources in this JS file. Lines 29 - 31
// 3. Customize the CSS, if desired. Line 46
// 4. Load the JS file in your HTML: `<script src='BasicAudioButton.js'></script>`
// 5. Initialize the library: `<body onload="initializeBasicAudioButtonJS();">`
// 6. Add your AudioButtons to your HTML as follows. (Use absolute filepaths or pausing won't work correctly.)

// HTML USAGE EXAMPLES
// <img id='button1' class='audioButton' onclick='playAudio("http://www.cow.com/audio1.mp3", this.id);'>
// <img id='button2' class='audioButton' onclick='playAudio("http://www.cow.com/audio2.mp3", this.id);'>
// <img id='button3' class='audioButton' onclick='playAudio("http://www.cow.com/audio3.mp3", this.id);'>

// REAL WORLD IMPLEMENTATION
// Subpages at www.taylorcalderone.com/music








// Set up button source images
var playButtonIMG = 'Images/play.png';
var pauseButtonIMG = 'Images/pause.png';
var loadingButtonIMG = 'Images/loading.gif';

// Sets all button images on the page to 'play'
function resetAllSongButtons() {
	var elements = document.getElementsByClassName('audioButton');
	for (var i = 0; i < elements.length; i++) {
	    elements[i].src = playButtonIMG;
	}
}

function initializeBasicAudioButtonJS() {	
	resetAllSongButtons();
	
	// Set up the CSS (so that we don't need a separate CSS file)
	var extraCSS = document.createElement('style');
	extraCSS.innerHTML = ".audioButton { height:30.6px; vertical-align: top; } .audioButton:hover { cursor:pointer; }";
	document.body.appendChild(extraCSS);
	
	// Create the invisible audioPlayer
	var extraAudioTag = document.createElement('audio');
	extraAudioTag.id = 'audioPlayer';
	document.body.appendChild(extraAudioTag);
}








function playAudio(file, buttonID) {
	// Play
	if (audioPlayer.paused) {
		// Don't reload the mp3 if the user restarts playback. This turns pause into 'restart from beginning'
		if (audioPlayer.currentTime == 0) { audioPlayer.src = file; }
		play();
	}


	// Pause
	// IMPORTANT - Only works with absolute filepaths
	else {
		audioPlayer.pause();
		document.getElementById(buttonID).src = playButtonIMG;
	}


	// Forces Play if you switch between tracks
	if (audioPlayer.src !== file) {
		// Manually change all button images to 'play'
		resetAllSongButtons();
		// ..and play
		audioPlayer.src = file;
		play();
	}








	function play() {
		audioPlayer.play();
		document.getElementById(buttonID).src = loadingButtonIMG;
		// Add listener to change the button image once the track begins playing
		checkForSongLoaded();
		// Add listener to revert the button image once the track finishes
		setTimeout(checkForSongEnd, 1000);
	}
	
	// Event listener to change the button image when a song begins playing
	function checkForSongLoaded() {
		if (audioPlayer.currentTime > 0) {
			document.getElementById(buttonID).src = pauseButtonIMG;
			// Reverts the button if you select a new one before loading finishes
			if (audioPlayer.src !== file) { document.getElementById(buttonID).src = playButtonIMG; }
		} else { setTimeout(checkForSongLoaded, 200); }
	}
	
	// Event listener to revert the button image when a song ends
	// The <audio> element autopauses when this happens
	function checkForSongEnd() {
		if (audioPlayer.paused == true) {
			document.getElementById(buttonID).src = playButtonIMG;
		} else { setTimeout(checkForSongEnd, 1000); }
	}
}