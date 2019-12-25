// Tab navigation
function displayTab(q) {
	// Hide all tabs
	formPage1.className = 'invisible'
	formPage2.className = 'invisible' 
	formPage3.className = 'invisible'

	// Display selected tab
	window['formPage'+q].className = ''
}


// Form functionality
const searchAPI = function() { calculateZipcode(zipCodeInput.value) }
const submitButtonAlert = function() { alert('Imaginary form submitted!') }


// Attach tab navigation to buttons
pageOneNextButton.addEventListener('click', function(){displayTab(2)}, false)
pageTwoBackButton.addEventListener('click', function(){displayTab(1)}, false)
pageTwoNextButton.addEventListener('click', function(){displayTab(3)}, false)
pageThreeBackButton.addEventListener('click', function(){displayTab(2)}, false)
pageThreeSubmitButton.addEventListener('click', function(){displayTab(1)}, false)


// Attach functionality to buttons
pageOneNextButton.addEventListener('click', searchAPI, false)
pageThreeSubmitButton.addEventListener('click', submitButtonAlert, false)








// Get the Ziptastic API data
function calculateZipcode(zipcode) {
	if (zipcode != '') {
		const url = 'https://ziptasticAPI.com/' + zipcode

		fetch(url).then(function(response) {
			response.json().then(function(data) {
				console.log(data)
				formPage2City.value = data.city
				formPage2State.value = data.state
			})
		})
		.catch(function(status) {
		   	alert(status)
		})
	}
}
