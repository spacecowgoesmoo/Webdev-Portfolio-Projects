// Everything is vanilla, JS and CSS




// Tab design from MiniTES ( https://www.kongregate.com/games/spacecowgoesmoo/minites )
// Step 1: Create a 'hide all tabs' function
function hideAllTabs() {
	formPage1.className = 'invisible'
	formPage2.className = 'invisible' 
	formPage3.className = 'invisible' 
}


// Step 2: onClick, hide all tabs and then show the desired tab
let pageOneNextButtonJS = 		function() { hideAllTabs(); formPage2.className = ''; calculateZipcode(zipCodeInput.value) }
let pageTwoBackButtonJS = 		function() { hideAllTabs(); formPage1.className = '' }
let pageTwoNextButtonJS = 		function() { hideAllTabs(); formPage3.className = '' }
let pageThreeBackButtonJS = 	function() { hideAllTabs(); formPage2.className = '' }
let pageThreeSubmitButtonJS = 	function() { alert('Imaginary form submitted!'); hideAllTabs(); formPage1.className = '' }


// Add functions to form buttons
pageOneNextButton.addEventListener('click', pageOneNextButtonJS, false)
pageTwoBackButton.addEventListener('click', pageTwoBackButtonJS, false)
pageTwoNextButton.addEventListener('click', pageTwoNextButtonJS, false)
pageThreeBackButton.addEventListener('click', pageThreeBackButtonJS, false)
pageThreeSubmitButton.addEventListener('click', pageThreeSubmitButtonJS, false)








// Get the Ziptastic API data
function calculateZipcode(zipcode) {
	if (zipcode != '') {
		let url = 'https://ziptasticAPI.com/' + zipcode

		fetch(url).then(function(response) {
			response.json().then(function(data) {
				console.log(data)
				formPage2City.value = data.city
				formPage2State.value = data.state
			})
		})
		.catch(function(status) {
		   	alert(status);
		});
	}
}
