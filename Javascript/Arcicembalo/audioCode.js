var cow = { 
	currentOctave: "lowerOctave",
	currentTutorialPage: 0,
	tutorialKeyRecord: "",
	tutorialPageUnlocked: 1,
	
	lowerOctave: {
		assignedSound1: 			"Audio/8 C3, +41.wav",
		assignedSound2: 			"Audio/6 Csharp3, -42.wav",
		assignedSound3: 			"Audio/9 D3, +34.wav",
		assignedSound4: 			"Audio/7 Dsharp3, -49.wav",
		assignedSound5: 			"Audio/10 E3, +27.wav",
		assignedSound6: 			"Audio/11 F3, +44.wav",
		assignedSound7: 			"Audio/8 Fsharp3, -39.wav",
		assignedSound8: 			"Audio/12 G3, +37.wav",
		assignedSound9: 			"Audio/4 Gsharp3, -46.wav",
		assignedSound0: 			"Audio/13 A3, +30.wav",
		assignedSoundMinus: 		"Audio/10 Asharp3, +47.wav",
		assignedSoundEquals: 		"Audio/14 B3, +23.wav",
	
		assignedSoundQ: 			"Audio/1 C2, 0.wav",
		assignedSoundW: 			"Audio/1 Csharp2, +17.wav",
		assignedSoundE: 			"Audio/6 Csharp3, -2.wav",
		assignedSoundR: 			"Audio/2 Dsharp2, +10.wav",
		assignedSoundT: 			"Audio/7 E3, -8.wav",
		assignedSoundY: 			"Audio/4 F2, +3.wav",
		assignedSoundU: 			"Audio/3 Fsharp2, +20.wav",
		assignedSoundI: 			"Audio/8 G3, +2.wav",
		assignedSoundO: 			"Audio/4 Gsharp2, +13.wav",
		assignedSoundP: 			"Audio/9 A3, -5.wav",
		assignedSoundLeftBracket: 	"Audio/5 Asharp2, +6.wav",
		assignedSoundRightBracket: 	"Audio/7 B2, -18.wav",
		assignedSoundForwardSlash: 	"Audio/15 C4, 0.wav",
	
		assignedSoundA: 			"Audio/1 C2, -42.wav",
		assignedSoundS: 			"Audio/1 Csharp2, -24.wav",
		assignedSoundD: 			"Audio/2 D2, -7.wav",
		assignedSoundF: 			"Audio/2 Dsharp2, -31.wav",
		assignedSoundG: 			"Audio/3 E2, -14.wav",
		assignedSoundH: 			"Audio/4 F2, -38.wav",
		assignedSoundJ: 			"Audio/3 Fsharp2, -21.wav",
		assignedSoundK: 			"Audio/5 G2, -4.wav",
		assignedSoundL: 			"Audio/9 Gsharp2, -28.wav",
		assignedSoundSemicolon: 	"Audio/6 A2, -11.wav",
		assignedSoundHalfQuote: 	"Audio/5 Asharp2, -35.wav"
	},
	
	higherOctave: {
		assignedSound1: 			"Audio/8 C5, +41.wav",
		assignedSound2: 			"Audio/6 Csharp5, -42.wav",
		assignedSound3: 			"Audio/9 D5, +34.wav",
		assignedSound4: 			"Audio/7 Dsharp5, -49.wav",
		assignedSound5: 			"Audio/10 E5, +27.wav",
		assignedSound6: 			"Audio/11 F5, +44.wav",
		assignedSound7: 			"Audio/8 Fsharp5, -39.wav",
		assignedSound8: 			"Audio/12 G5, +37.wav",
		assignedSound9: 			"Audio/9 Gsharp5, -46.wav",
		assignedSound0: 			"Audio/13 A5, +30.wav",
		assignedSoundMinus: 		"Audio/10 Asharp5, +47.wav",
		assignedSoundEquals: 		"Audio/14 B5, +23.wav",
	
		assignedSoundQ: 			"Audio/15 C4, 0.wav",
		assignedSoundW: 			"Audio/1 Csharp4, +17.wav",
		assignedSoundE: 			"Audio/6 Csharp5, -2.wav",
		assignedSoundR: 			"Audio/2 Dsharp4, +10.wav",
		assignedSoundT: 			"Audio/7 E5, -8.wav",
		assignedSoundY: 			"Audio/4 F4, +3.wav",
		assignedSoundU: 			"Audio/3 Fsharp4, +20.wav",
		assignedSoundI: 			"Audio/8 G5, +2.wav",
		assignedSoundO: 			"Audio/4 Gsharp4, +13.wav",
		assignedSoundP: 			"Audio/9 A5, -5.wav",
		assignedSoundLeftBracket: 	"Audio/5 Asharp4, +6.wav",
		assignedSoundRightBracket: 	"Audio/7 B4, -18.wav",
		assignedSoundForwardSlash: 	"Audio/15 C6, 0.wav",
	
		assignedSoundA: 			"Audio/15 C4, -42.wav",
		assignedSoundS: 			"Audio/1 Csharp4, -24.wav",
		assignedSoundD: 			"Audio/2 D4, -7.wav",
		assignedSoundF: 			"Audio/2 Dsharp4, -31.wav",
		assignedSoundG: 			"Audio/3 E4, -14.wav",
		assignedSoundH: 			"Audio/4 F4, -38.wav",
		assignedSoundJ: 			"Audio/3 Fsharp4, -21.wav",
		assignedSoundK: 			"Audio/5 G4, -4.wav",
		assignedSoundL: 			"Audio/4 Gsharp4, -28.wav",
		assignedSoundSemicolon: 	"Audio/6 A4, -11.wav",
		assignedSoundHalfQuote: 	"Audio/5 Asharp4, -35.wav",
	}
}




function playAudioBasic( file ) {
	let snd = new Audio( file ) 				// Loads file. Remember to use folder paths
	snd.type = 'audio/wav'
	snd.play()									// Plays file
	displayCents( file )
}

function displayCents( file ) {					// Parses the audio filename for the cent variation
	let q = file
	let lastSpace = q.lastIndexOf(" ")			// Get the last space in the string
	q = q.substring(lastSpace + 1, q.length - 4)// Cut out everything except the number we want
	centsDisplay.innerHTML = q					// Update the textfield
}

function showDot ( number ) {
	let q = "dot" + number
	window[q].classList.add('dotFade')
	setTimeout(function() { window[q].classList.remove('dotFade'); }, 1000)
}
















function toggleOctave() {
	if ( cow.currentOctave == "lowerOctave" ) {
		octaveDisplay.innerHTML = "Current octave: the octave below middle C" 
		cow.currentOctave = "higherOctave"
		// Go to lower octave
	}
	else if ( cow.currentOctave == "higherOctave" ) { 
		octaveDisplay.innerHTML = "Current octave: 2 octaves below middle C"
		cow.currentOctave = "lowerOctave"
		// Go to higher octave
	}
}








function keystroke1() 				{ showDot(14); 	playAudioBasic( cow[cow.currentOctave].assignedSound1 ) }
function keystroke2() 				{ showDot(9); 	playAudioBasic( cow[cow.currentOctave].assignedSound2 ) }
function keystroke3() 				{ showDot(15); 	playAudioBasic( cow[cow.currentOctave].assignedSound3 ) }
function keystroke4() 				{ showDot(10); 	playAudioBasic( cow[cow.currentOctave].assignedSound4 ) }
function keystroke5() 				{ showDot(16); 	playAudioBasic( cow[cow.currentOctave].assignedSound5 ) }
function keystroke6() 				{ showDot(17); 	playAudioBasic( cow[cow.currentOctave].assignedSound6 ) }
function keystroke7() 				{ showDot(11); 	playAudioBasic( cow[cow.currentOctave].assignedSound7 ) }
function keystroke8() 				{ showDot(18); 	playAudioBasic( cow[cow.currentOctave].assignedSound8 ) }
function keystroke9() 				{ showDot(12); 	playAudioBasic( cow[cow.currentOctave].assignedSound9 ) }
function keystroke0() 				{ showDot(19); 	playAudioBasic( cow[cow.currentOctave].assignedSound0 ) }
function keystrokeMinus() 			{ showDot(13); 	playAudioBasic( cow[cow.currentOctave].assignedSoundMinus ) }
function keystrokeEquals() 			{ showDot(20); 	playAudioBasic( cow[cow.currentOctave].assignedSoundEquals ) }

function keystrokeQ() 				{ showDot(35); 	playAudioBasic( cow[cow.currentOctave].assignedSoundQ ) }
function keystrokeW() 				{ showDot(23); 	playAudioBasic( cow[cow.currentOctave].assignedSoundW ) }
function keystrokeE() 				{ showDot(2); 	playAudioBasic( cow[cow.currentOctave].assignedSoundE ) }
function keystrokeR() 				{ showDot(31); 	playAudioBasic( cow[cow.currentOctave].assignedSoundR ) }
function keystrokeT() 				{ showDot(3); 	playAudioBasic( cow[cow.currentOctave].assignedSoundT ) }
function keystrokeY() 				{ showDot(38);	playAudioBasic( cow[cow.currentOctave].assignedSoundY ) }
function keystrokeU() 				{ showDot(26); 	playAudioBasic( cow[cow.currentOctave].assignedSoundU ) }
function keystrokeI() 				{ showDot(5); 	playAudioBasic( cow[cow.currentOctave].assignedSoundI ) }
function keystrokeO() 				{ showDot(27); 	playAudioBasic( cow[cow.currentOctave].assignedSoundO ) }
function keystrokeP() 				{ showDot(6); 	playAudioBasic( cow[cow.currentOctave].assignedSoundP ) }
function keystrokeLeftBracket() 	{ showDot(34); 	playAudioBasic( cow[cow.currentOctave].assignedSoundLeftBracket ) }
function keystrokeRightBracket() 	{ showDot(41); 	playAudioBasic( cow[cow.currentOctave].assignedSoundRightBracket ) }
function keystrokeForwardSlash() 	{ showDot(21); showDot(42); playAudioBasic( cow[cow.currentOctave].assignedSoundForwardSlash ) }

function keystrokeA() 				{ showDot(1); showDot(22); playAudioBasic( cow[cow.currentOctave].assignedSoundA ) }
function keystrokeS() 				{ showDot(30); 	playAudioBasic( cow[cow.currentOctave].assignedSoundS ) }
function keystrokeD() 				{ showDot(36); 	playAudioBasic( cow[cow.currentOctave].assignedSoundD ) }
function keystrokeF() 				{ showDot(24); 	playAudioBasic( cow[cow.currentOctave].assignedSoundF ) }
function keystrokeG() 				{ showDot(37); 	playAudioBasic( cow[cow.currentOctave].assignedSoundG ) }
function keystrokeH() 				{ showDot(4); showDot(25); playAudioBasic( cow[cow.currentOctave].assignedSoundH ) }
function keystrokeJ() 				{ showDot(32); 	playAudioBasic( cow[cow.currentOctave].assignedSoundJ ) }
function keystrokeK() 				{ showDot(39);	playAudioBasic( cow[cow.currentOctave].assignedSoundK ) }
function keystrokeL() 				{ showDot(33); 	playAudioBasic( cow[cow.currentOctave].assignedSoundL ) }
function keystrokeSemicolon() 		{ showDot(40); 	playAudioBasic( cow[cow.currentOctave].assignedSoundSemicolon ) }
function keystrokeHalfQuote() 		{ showDot(28); 	playAudioBasic( cow[cow.currentOctave].assignedSoundHalfQuote ) }




// The extra stuff in the first IF statement mutes the arcicembalo if the user is typing in the 'Contact me' section
document.onkeydown = function ( e ) {
	if ( cow.preloadingComplete == true && document.activeElement !== javascript_form.formSubject && document.activeElement !== javascript_form.formMessage ) {
		
		// Save the keycodes if the user is in the tutorial
		if ( tutorialContainer.style.display == 'block' ) {
			cow.tutorialKeyRecord = cow.tutorialKeyRecord + e.key
		}		
		
		// Play the note
		switch ( e.keyCode ) {
			case 192: 	toggleOctave(); break				// `
    	
			case 49: 	keystroke1(); break					// 1
			case 50: 	keystroke2(); break					// 2
			case 51: 	keystroke3(); break					// 3
			case 52: 	keystroke4(); break					// 4
			case 53: 	keystroke5(); break					// 5
			case 54: 	keystroke6(); break					// 6
			case 55: 	keystroke7(); break					// 7
			case 56: 	keystroke8(); break					// 8
			case 57: 	keystroke9(); break					// 9
			case 48: 	keystroke0(); break					// 0
			case 173: 	keystrokeMinus(); break				// -
			case 189: 	keystrokeMinus(); break				// -		// Duplicate because Chrome has the wrong keycode
			case 61: 	keystrokeEquals(); break			// =
			case 187: 	keystrokeEquals(); break			// =		// Duplicate because Chrome has the wrong keycode
    	
			case 81: 	keystrokeQ(); break					// Q
			case 87: 	keystrokeW(); break					// W
			case 69: 	keystrokeE(); break					// E
			case 82: 	keystrokeR(); break					// R
			case 84: 	keystrokeT(); break					// T
			case 89: 	keystrokeY(); break					// Y
			case 85: 	keystrokeU(); break					// U
			case 73: 	keystrokeI(); break					// I
			case 79: 	keystrokeO(); break					// O
			case 80: 	keystrokeP(); break					// P
			case 219: 	keystrokeLeftBracket() ; break		// [
			case 221: 	keystrokeRightBracket(); break		// ]
			case 220: 	keystrokeForwardSlash(); break		// \
			
			case 65: 	keystrokeA(); break					// A
			case 83: 	keystrokeS(); break					// S
			case 68: 	keystrokeD(); break					// D
			case 70: 	keystrokeF(); break					// F
			case 71: 	keystrokeG(); break					// G
			case 72: 	keystrokeH(); break					// H
			case 74: 	keystrokeJ(); break					// J
			case 75: 	keystrokeK(); break					// K
			case 76: 	keystrokeL(); break					// L
			case 59: 	keystrokeSemicolon(); break			// ;
			case 186: 	keystrokeSemicolon(); break			// ;		// Duplicate because Chrome has the wrong keycode
			case 222: 	e.preventDefault(); keystrokeHalfQuote(); break	// '	// The extra thing prevents Firefox from popping up a find bar
			default: return
		}
	}
}
