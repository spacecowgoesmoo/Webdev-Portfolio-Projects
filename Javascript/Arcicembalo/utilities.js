function moo() {
	console.log('moo');
}




// NOTE - Safari's audio engine is garbage and has 10-year old errors in it
// Preloading in Safari does nothing at all, and it breaks the page a lot anyways
// Preloading in IE/Edge is broken, but we can probably fix it given time
function checkBrowserForPreloader() {
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
	
	if ( isSafari === true || isIE === true ){ unlockKeyboard() }
	else { preloadFiles() }
}




function preloadFiles() {
	const audioFiles = [
	"Audio/1 C2, -42.wav",
	"Audio/1 C2, 0.wav",
	"Audio/1 Csharp2, -24.wav",
	"Audio/1 Csharp2, +17.wav",
	"Audio/1 Csharp4, -24.wav",
	"Audio/1 Csharp4, +17.wav",
	"Audio/2 D2, -7.wav",
	"Audio/2 D4, -7.wav",
	"Audio/2 Dsharp2, -31.wav",
	"Audio/2 Dsharp2, +10.wav",
	"Audio/2 Dsharp4, -31.wav",
	"Audio/2 Dsharp4, +10.wav",
	"Audio/3 E2, -14.wav",
	"Audio/3 E4, -14.wav",
	"Audio/3 Fsharp2, -21.wav",
	"Audio/3 Fsharp2, +20.wav",
	"Audio/3 Fsharp4, -21.wav",
	"Audio/3 Fsharp4, +20.wav",
	"Audio/4 F2, -38.wav",
	"Audio/4 F2, +3.wav",
	"Audio/4 F4, -38.wav",
	"Audio/4 F4, +3.wav",
	"Audio/4 Gsharp2, +13.wav",
	"Audio/4 Gsharp3, -46.wav",
	"Audio/4 Gsharp4, -28.wav",
	"Audio/4 Gsharp4, +13.wav",
	"Audio/5 Asharp2, -35.wav",
	"Audio/5 Asharp2, +6.wav",
	"Audio/5 Asharp4, -35.wav",
	"Audio/5 Asharp4, +6.wav",
	"Audio/5 G2, -4.wav",
	"Audio/5 G4, -4.wav",
	"Audio/6 A2, -11.wav",
	"Audio/6 A4, -11.wav",
	"Audio/6 Csharp3, -2.wav",
	"Audio/6 Csharp3, -42.wav",
	"Audio/6 Csharp5, -2.wav",
	"Audio/6 Csharp5, -42.wav",
	"Audio/7 B2, -18.wav",
	"Audio/7 B4, -18.wav",
	"Audio/7 Dsharp3, -49.wav",
	"Audio/7 Dsharp5, -49.wav",
	"Audio/7 E3, -8.wav",
	"Audio/7 E5, -8.wav",
	"Audio/8 C3, +41.wav",
	"Audio/8 C5, +41.wav",
	"Audio/8 Fsharp3, -39.wav",
	"Audio/8 Fsharp5, -39.wav",
	"Audio/8 G3, +2.wav",
	"Audio/8 G5, +2.wav",
	"Audio/9 A3, -5.wav",
	"Audio/9 A5, -5.wav",
	"Audio/9 D3, +34.wav",
	"Audio/9 D5, +34.wav",
	"Audio/9 Gsharp2, -28.wav",
	"Audio/9 Gsharp5, -46.wav",
	"Audio/10 Asharp3, +47.wav",
	"Audio/10 Asharp5, +47.wav",
	"Audio/10 B3, -12.wav",
	"Audio/10 B5, -12.wav",
	"Audio/10 E3, +27.wav",
	"Audio/10 E5, +27.wav",
	"Audio/11 F3, +44.wav",
	"Audio/11 F5, +44.wav",
	"Audio/12 G3, +37.wav",
	"Audio/12 G5, +37.wav",
	"Audio/13 A3, +30.wav",
	"Audio/13 A5, +30.wav",
	"Audio/14 B3, +23.wav",
	"Audio/14 B5, +23.wav",
	"Audio/15 C4, -42.wav",
	"Audio/15 C4, 0.wav",
	"Audio/15 C6 , -42.wav",
	"Audio/15 C6, 0.wav"
	];
	
	function preloadAudio(url) {
	    let audio = new Audio();
		audio.type = 'audio/wav';
	    // once this file loads, it will call loadedAudio()
	    // the file will be kept by the browser as cache
	    audio.addEventListener('canplaythrough', loadedAudio, false);
	    audio.src = url;
	}
    
	let loaded = 0;
	function loadedAudio() {
	    // this will be called every time an audio file is loaded
	    // we keep track of the loaded files vs the requested files
	    loaded++;
		preloaderText.innerHTML = "Loading audio file " + (loaded+1) + "/74.."
	    if (loaded == audioFiles.length){
	    	// all have loaded
	    	unlockKeyboard();
	    }
	}
    
	let player = document.getElementById('cowPreloader');
	function play(index) {
	    player.src = audioFiles[index];
		player.volume = 0
	    player.play();
	}
    
	// we start preloading all the audio files
	for (let i in audioFiles) {
	    preloadAudio(audioFiles[i]);
	}
}




function unlockKeyboard() {
    // do your stuff here, audio has been loaded
	cow.preloadingComplete = true
	preloaderText.style.display = 'none'
	keyboardInformation.style.display = 'block'
	keyboardImage.style.opacity = 1
}
