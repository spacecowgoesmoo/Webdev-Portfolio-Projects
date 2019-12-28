// Utilities
function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
function moo() { console.log("moo"); }



// https://github.com/RougeWare/Micro-JS-Enum/tree/master/lib
// Used in the jobData.js files
function enumerate() { v=arguments;s={all:[],keys:v};for(i=v.length;i--;)s[v[i]]=s.all[i]=v[i];return s };




function loadCSS(q) {
	disableButton(q, 'CSS');
	const r = 'style' + q
	loadCSSThemeHere.innerHTML = '<link rel="stylesheet" href="' + r + '.css">';
}




function disableButton(buttonNumber, set) {
	// Enable all buttons within the selected set
	const buttons = document.getElementsByTagName('button');
	switch (set) {
		case 'jobs': for (let q=0; q<3; q++) { buttons[q].disabled = false; } break;		// Fragile/fast method to divide the buttons into sets
		case 'CSS':	for (let q=3; q<6; q++) { buttons[q].disabled = false; } break;			// Fragile/fast method to divide the buttons into sets
		default: break;
	}
	// Disable the one we just clicked
	if (set == 'CSS') { buttonNumber += 3 }													// Fragile/fast method to divide the buttons into sets
	const q = 'button' + buttonNumber
	document.getElementById(q).disabled = true
}
