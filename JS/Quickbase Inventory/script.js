function loadTable() {   
   console.log ('initialized table');
    $('#loanTable').dataTable( {
        "data": qdb_data, 
        // "bPaginate": false,
		"pageLength": 25,
        "bLengthChange": false,
        "bAutoWidth": false,
        "iDisplayLength": -1,
        "sPaginationType": "full_numbers",
        
        "aaSorting": [0, "asc"],
        "aoColumns": [ { "sTitle": "Name" },
                       { "sTitle": "Asset #" },
                       { "sTitle": "Status" }
                     ],
		
		// Events that trigger anytime something is (re)drawn
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if ( aData[2] == "1" ) { 
						$('td', nRow).css('background-color', '#58C0D9'); 			// Colorizes loaned out rows
						$('td:eq(2)', nRow).html("On Loan");						// Changes the third column from 0/1 to text
					} else {
						$('td:eq(2)', nRow).html("Available");						// Changes the third column from 0/1 to text
					}
				 }
    });

    
    // Retakes keyboard controls back from dataTables
    window.focus();
}














function populateTimestamp() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var dateString =  hour + ":" + min + ":" + sec + ", " + month + "-" + day + "-" + date.getFullYear();

    document.getElementById("timeSpan").innerHTML = dateString;
}








function mainLoopWithAutoRefresh() {
    loadTable();
    populateTimestamp();
	// Note: This page originally used Google Apps Script for hosting
	
	// Original comment:
    // Because Google Script is more complex than plain HTML/JS, the next line requires .top. or it doesn't work
    // Most standard autorefresh techniques don't work either
    setTimeout('window.top.location.href = "index.html"', 120000);
}