const cowTutorial = {
	
	textBlock1: "Hello, and welcome to this interactive tutorial, which will slowly walk you through everything you need to know to play this digital arcicembalo. The arcicembalo was a medieval harpsichord that contained 31 keys in every octave, which enabled it to play thirds in just intonation in all 12 keys. This laser-like attention to small differences in frequency can help us draw a lot of incisive conclusions about our own musical culture, as dominated by equal temperament as some of them are. Unfortunately, the arcicembalo is now either lost to history or inaccessible to the public, so I've researched, created, and now released this digital rendering of it so that anyone can learn from and enjoy it as much as I do.",
	
	textBlock2: "Let's start by teaching you how this arcicembalo is organized. Please look at the row of keys on your computer keyboard right below the line of numbers. It begins with the Q button, then the W button, the E button, and so on. This is your home row; you should mainly place your fingers along this line, just like you might keep your pinky and thumb on the tonic note in a normal piano. This row is especially important because our two other rows—the higher row of keys that has all the numbers on it, and the lower row of keys that begins with the letters A, S, and D—are simply variations on what happens in this home row.",
	
	textBlock3: "This home row's 13 keys contain all of the arcicembalo notes that are closest to a fully chromatic and equal-tempered C major scale, which this instrument manages to recreate with nearly perfect accuracy. Please now press every key in order, from the Q all the way on the left to the ending backslash key all the way on the right. This tutorial won't progress until you do!",
	
	// [WAIT FOR THE KEYS [Q,] [W,] [E,] [R,] [T,] [Y,] [U,] [I,] [O,] [P,] [, ], AND [\] TO BE PRESSED IN THAT ORDER]
	
	textBlock4: "Great! Now, the original arcicembalo was not organized along the lines of equal temperament. Instead, its scales were tuned for just intonation. But my hope in making equal temperament the basis of this new arcicembalo was to give users something familiar to hang onto, while introducing enough new and unexpected surprises that they still enjoy questioning some of the fundamental assumptions that our musical cultures can sometimes make without even thinking about it.<br><br>One of those assumptions is that each note always has the same frequency. But what if the tonic note in an equal-tempered C major scale were to sometimes be just a little flat, almost halfway to being a B?<br><br>First, we'll play something familiar in equal temperament. Please press the buttons Q, T, Y, and I on your computer keyboard.",
	
	// [WAIT FOR THE KEYS [Q,] [T,] [Y,] AND [I] TO BE PRESSED IN THAT ORDER.]
	
	textBlock5: "Recognize it? That's the opening of 'When the Saints Go Marching In.'<br><br>Now, let's listen as the arcicembalo's 3 available types of the Note E add some microtonal variation to that melody. We'll do this by changing the second keypad we hit, from a [T] to a [5] now.<br><br>Please press Q, 5, Y, and I, at this time.",
	
	// [WAIT FOR THE KEYS [Q,] [5,] [Y,] and [I] TO BE PRESSED IN THAT ORDER.]
	
	textBlock6: "Hear that? The difference is only 33 total cents — really hard to hear — but it's there all right!<br><br>The arcicembalo wasn't originally intended to be used in this expressive, contrastive way. Instead, it was created to achieve pure, just-intoned thirds in all 12 keys. But to play triads on a computer keyboard while modulating through multiple keys within only a single octave range would be extremely difficult. So, for now, we'll simply compare the thirds.",
	
	textBlock7: "The arcicembalo's intricate intonation allows us to take a pretty standard harmonic motion—say, the collapse of a tritone into a major third—and to accomplish it in a variety of ways.<br><br>We'll play a tritone of E to Bb, and then a major third of F to A, first in equal temperament. Press the T and open bracket sign on your computer keyboard, and then the Y and P buttons.",
	
	// [WAIT FOR THE [T], [[], [Y], AND [P] BUTTONS TO BE PRESSED IN THAT ORDER.]
	
	textBlock8: "Now, we'll do this modulation in just intonation. Press the 5 and minus sign buttons, and then the Y and semicolon button.",
	
	// [WAIT FOR THE [5], [-], [Y] AND [;] BUTTONS TO BE PRESSED, IN THAT ORDER.]
	
	textBlock9: "Last, we'll accomplish this same motion in the most detuned way possible. Please press the G and apostrophe buttons, and then the J and 0 buttons.",
	
	// [WAIT FOR THE [G], ['], [J], AND [0] BUTTONS TO BE PRESSED, IN THAT ORDER.]
	
	textBlock10: "Doesn't that bring out a lot of shadings in not only timbre, but the strength of the modulation, too?<br><br>You may have picked up on it by now, but this computer arcicembalo is layed out in 13 vertical columns of 3 keys each. The vertical columns of your keyboard have been divided into 11 'trios' that all play the same note at slightly different pitches, as well as incomplete 'duos' that are missing 1 or 2 pitches. However, there are only two incomplete duos. There is a picture further down the page that shows this visually.",
	
	textBlock11: " The columns and their pitches are:<br><br>1, Q, and A, which all together play different versions of the note C;<br>2, W, and S, which plays versions of C sharp and D flat;<br>3, E, and D, which play Ds;<br>4, R, and F, which play D sharps or E flats;<br>5, T, and G, which play Es;<br>6, Y, and H, which play Fs;<br>7, U, and J, which play F sharps or G flats;<br>8, I, and K, which play Gs;<br>9, O, and L, which play G sharps or A flatss;<br>0, P, and the semicolon button, which play As;<br>..And the minus sign, open bracket, and apostrophe button, which play A sharps or B flats.",

	textBlock12: "The two duos are the two B notes that are played by the equal sign button and the closed bracket sign, and the backwards slash button that plays only a single version of the high C note.<br><br>Now you know enough to go out and start playing around with this arcicembalo on your own. You might begin by simply playing notes within two adjacent trios, and trying to trace how that note slowly changes in terms of its timbres and pitches.",

	textBlock13: "We'll end this tutorial by allowing the arcicembalo to really soar as it plays a work by a composer who's very well known for his complex counterpoint and modulations: J.S. Bach. What follows is a rendering of Bach's 'Bourrée in E minor', as played on this digital arcicembalo. I played it live, so it's not perfect, but please enjoy it, and thank you so much for checking out this site! If you have a question or comment, feel free to reach me at mepc36@gmail.com. Thanks again!"

	// [BEGIN PLAYING "BOURREE" AUDIO FILE]
}
















function beginTutorial() {
	tutorialContainer.style.display = 'block'					// Initialize a bunch of stuff
	tutorialNextPage.style.display = "block"
	tutorialText.innerHTML = cowTutorial.textBlock1
	tutorialPreviousPage.innerHTML = '< Exit'
	tutorialNextPage.innerHTML = 'Next Page >'
	cow.currentTutorialPage = 1
	cow.tutorialKeyRecord = ""
	cow.tutorialPageUnlocked = 1
}

function closeTutorial() {
	tutorialContainer.style.display = 'none'
}

function gotoPreviousTutorialPage() {
	cow.currentTutorialPage --
	tutorialNextPage.style.display = "block" 
	
	// Page button text logic
	if ( cow.currentTutorialPage >= 13 ) { tutorialNextPage.innerHTML = 'Exit >' }
	else { tutorialNextPage.innerHTML = 'Next Page >' }
	if ( cow.currentTutorialPage == 1 ) { tutorialPreviousPage.innerHTML = '< Exit' }
	else { tutorialPreviousPage.innerHTML = '< Previous Page' }
	
	// Update audio player
	updateTutorialAudioPlayer()
	
	// Exit tutorial
	if ( cow.currentTutorialPage == 0 ) { closeTutorial() }
	else { tutorialText.innerHTML = cowTutorial['textBlock' + cow.currentTutorialPage] }
}

function gotoNextTutorialPage() {
	cow.currentTutorialPage ++
	
	// Page button text logic
	if ( cow.currentTutorialPage >= 2 ) { tutorialPreviousPage.innerHTML = '< Previous Page' }
	else { tutorialPreviousPage.innerHTML = '< Exit' }
	if ( cow.currentTutorialPage == 13 ) { tutorialNextPage.innerHTML = 'Exit >'; }
	else { tutorialNextPage.innerHTML = 'Next Page >' }
	
	// Update audio player
	updateTutorialAudioPlayer()
	
	// Exit tutorial
	if ( cow.currentTutorialPage == 14 ) { tutorialContainer.style.display = 'none' }
	else { tutorialText.innerHTML = cowTutorial['textBlock' + cow.currentTutorialPage] }
	
	// Hide the button if some keystrokes are needed
	if ( cow.currentTutorialPage == 3 && cow.tutorialPageUnlocked < 4 ) { tutorialNextPage.style.display = "none" }
	if ( cow.currentTutorialPage == 4 && cow.tutorialPageUnlocked < 5 ) { tutorialNextPage.style.display = "none" }
	if ( cow.currentTutorialPage == 5 && cow.tutorialPageUnlocked < 6 ) { tutorialNextPage.style.display = "none" }
	if ( cow.currentTutorialPage == 7 && cow.tutorialPageUnlocked < 8 ) { tutorialNextPage.style.display = "none" }
	if ( cow.currentTutorialPage == 8 && cow.tutorialPageUnlocked < 9 ) { tutorialNextPage.style.display = "none" }
	if ( cow.currentTutorialPage == 9 && cow.tutorialPageUnlocked < 10 ) { tutorialNextPage.style.display = "none" }
}








// Listener for unlocking new pages
// We're already using onkeydown in audioCode.js, so this needs to be different
document.onkeypress = function ( e ) {
	if ( cow.tutorialKeyRecord.slice( - 13 ) == 'qwertyuiop[]\\' ) {
		if ( cow.tutorialPageUnlocked < 4 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 4 }
	}
	
	var q = cow.tutorialKeyRecord.slice( - 4 )
	switch ( q ) {
		case 'qtyi': if ( cow.tutorialPageUnlocked == 4 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 5 }	break;
		case 'q5yi': if ( cow.tutorialPageUnlocked == 5 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 6 }	break;
		case 't[yp': if ( cow.tutorialPageUnlocked == 6 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 8 }	break;
		case '5-y;': if ( cow.tutorialPageUnlocked == 8 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 9 }	break;
		case 'g\'j0':if ( cow.tutorialPageUnlocked == 9 ) { tutorialNextPage.style.display = "block"; cow.tutorialPageUnlocked = 10 }	break;
		default: break;
	}
}




function updateTutorialAudioPlayer() {
	// Stop playing
	audioPlayer.pause();
	
	// Load new audio file
	switch ( cow.currentTutorialPage ) {
		case 1: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover1.mp3', this.id)" ); break;
		case 2: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover2.mp3', this.id)" ); break;
		case 3: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover3.mp3', this.id)" ); break;
		case 4: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover4.mp3', this.id)" ); break;
		case 5: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover5.mp3', this.id)" ); break;
		case 6: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover6.mp3', this.id)" ); break;
		case 7: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover7.mp3', this.id)" ); break;
		case 8: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover8.mp3', this.id)" ); break;
		case 9: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/Audio/voiceover9.mp3', this.id)" ); break;
		case 10: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/voiceover10.mp3', this.id)" ); break;
		case 11: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/voiceover11.mp3', this.id)" ); break;
		case 12: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/voiceover12.mp3', this.id)" ); break;
		case 13: button2.setAttribute( 'onClick', "playAudio('https://www.taylorcalderone.com/frontendPortfolio/subpages/arcicembalo/voiceover13PlusBach.mp3', this.id)" ); break;
		default: break;
	}
}
