function populatePageWithData(jobNumber) {
	// Dynamically create everything based on the job object
	//
	// Important variables:
	// a, b, c: Object tree navigation. Also used to assign IDs to the created HTML
	// categoryDiv, categoryDivText, row, rowValue: Dynamically created HTML
	//
	// // // // // //
	
	// Grab the selected job using dynamic variable names
	const job = window['job' + jobNumber];
	
	// Clear whatever's on the page
	// The header doesn't need to be cleared
	jobContent.innerHTML = '';
	
	// Tab management
	disableButton(jobNumber, 'jobs');
	
	for (let a in job) {
		// Manually skip one or more items
		if (a != 'headline') {
			// Create the category div
			let categoryDiv = document.createElement('div');
			categoryDiv.id = a;
			categoryDiv.className = 'verticalSpacer20';
			jobContent.appendChild(categoryDiv);
			// Create the category div text header
			let categoryDivText = document.createElement('div');
			categoryDivText.innerHTML = capitalizeFirstLetter(a);
			categoryDivText.className = 'jobCategoryHeader';
			categoryDiv.appendChild(categoryDivText);
			
			// Iterate through the next object depth and populate the category div
			for (let b in job[a]) { 
				// Grab object rowValues
				let rowValue = job[a][b];
				// Make booleans more human readable
				if (rowValue === true) { rowValue = "Yes"; }
				if (rowValue === false) { rowValue = "No"; }
				
				// Create, populate, and inject the individual HTML rows
				let row = document.createElement('div');
				row.id = b;
				row.innerHTML = capitalizeFirstLetter(b) + ': ' + rowValue;
				categoryDiv.appendChild(row);
				
				// Bunch of extra stuff for oneof's
				if (job[a][b].oneof) {
					row.innerHTML = capitalizeFirstLetter(b) + ' (one of the following) - ';
					for (let c in job[a][b].oneof) {
						row.innerHTML += capitalizeFirstLetter(c) + ': ' + job[a][b].oneof[c] + ', ';
					}
					// Remove the trailing comma from the last item
					row.innerHTML = row.innerHTML.slice(0, -2);
				}
			}
		}
	}
	
	
	
	
	
	
	
	// Populating and reformatting some fields manually
	// Fancy header
	headline.innerHTML = job.headline;
	// Extra check to nicely add 'Remote' to the subheader
	if (job.specs.remote == 'Required') {
		locationsEmployment.innerHTML = job.essentials.locations + ', Remote - ' + job.essentials.employment;
	} else {
		locationsEmployment.innerHTML = job.essentials.locations + ' - ' + job.essentials.employment;
	}
	// Startdate
	startdate.innerHTML = 'Start date: ' + new Date(job.essentials.startdate);
	// Teamsize
	teamsize.innerHTML = 'Team size: ' + job.essentials.teamsize.min + ' - ' + job.essentials.teamsize.max;
	// Other
	other.innerHTML = '<div class="jobCategoryHeader">Other</div>';
	for (a in job.other) {
		let row = document.createElement('div');
		row.innerHTML = capitalizeFirstLetter(job.other[a]);
		other.appendChild(row);
	}
}
