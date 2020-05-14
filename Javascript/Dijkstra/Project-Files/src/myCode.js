class Maze {
	constructor(txtFileInput) {
		// Initializing these early just for reference
		this.dataArray = []
		this.height = 1
		this.width = 1
		this.playerSprite = ''
		this.rawMazeData = ''
		this.startingLocation = ''
		this.shortestPath = []

		// Data processing begins here
		this.rawMazeData = txtFileInput
		this.stripEmptyLines()
		this.getMazeHeight()
		this.getMazeWidth()
		this.reformatTxtFile()
		this.parseMazeTxtFile()
		console.log(this)
	}








	stripEmptyLines() {
		this.rawMazeData = this.rawMazeData.replace(/\r\r\n/g, "\n");
	}

	getMazeHeight() {
		this.height = (this.rawMazeData.match(/\n/g) || []).length + 1;
	}

	getMazeWidth() {
		this.width = ((this.rawMazeData.indexOf("\n")-1)/1.5)+1;
	}

	reformatTxtFile() {
		// Add extra spaces to the last square in each row for easier parsing later
		this.rawMazeData = this.rawMazeData.replace(/ \n/g, "   \n");
		this.rawMazeData = this.rawMazeData.replace(/\+\n/g, "+  \n");
		this.rawMazeData = this.rawMazeData.replace(/\|\n/g, "|  \n");
		// Add extra spaces to the very last square
		this.rawMazeData += '  ';
		// Finally, strip all the newlines
		this.rawMazeData = this.rawMazeData.replace(/\n/g, "");
	}

	parseMazeTxtFile() {
		var row = [];
		var q = this.width;

		for (var i=0; i<this.rawMazeData.length; i+=3) {
			switch (this.rawMazeData.slice(i, i+3)) {
				case '+--': row.push('Wall'); row.push('Wall'); break;
				case '   ': row.push('Empty'); row.push('Empty'); break;
				case '|  ': row.push('Wall'); row.push('Empty'); break;
				case '+  ': row.push('Wall'); row.push('Empty'); break;
				default: break;
			}
			// Detect start and goal squares
			if (row.length == 2 && row[0] =='Empty') { 
				row[0] = 'Start'; 
				this.startingLocation = [0, this.dataArray.length];
			}
			if (row.length == q+1 && row[q-1] =='Empty') { row[q-1] = 'Goal' }
			// Operations to setup the next row
			if (row.length >= q+1) {
				// Remove the last square because we created some junk data to simplify importing
				row.pop();
				// Add the rows
				this.dataArray.push(row); 
				// Clear the array for the next row
				row = []; 
			}
		}
	}
}












































function prepareTxtFile(mazeObject) {
	// Converting it to a string is automatically performed by adding it to mazeObject
	// Strip empty lines
	mazeObject.rawMazeData = mazeObject.rawMazeData.replace(/\r\r\n/g, "\n");
	// Get number of rows and columns
	mazeObject.height = (mazeObject.rawMazeData.match(/\n/g) || []).length + 1;
	mazeObject.width = ((mazeObject.rawMazeData.indexOf("\n")-1)/1.5)+1;
	// Add extra spaces to the last square in each row for easier parsing later
	mazeObject.rawMazeData = mazeObject.rawMazeData.replace(/ \n/g, "   \n");
	mazeObject.rawMazeData = mazeObject.rawMazeData.replace(/\+\n/g, "+  \n");
	mazeObject.rawMazeData = mazeObject.rawMazeData.replace(/\|\n/g, "|  \n");
	// Add extra spaces to the very last square
	mazeObject.rawMazeData += '  ';
	// Finally, strip all the newlines
	mazeObject.rawMazeData = mazeObject.rawMazeData.replace(/\n/g, "");
	return mazeObject;
}








function parseMazeTxtFile(mazeObject) {
	var row = [];
	var q = mazeObject.width;

	for (var i=0; i<mazeObject.rawMazeData.length; i+=3) {
		switch (mazeObject.rawMazeData.slice(i, i+3)) {
			case '+--': row.push('Wall'); row.push('Wall'); break;
			case '   ': row.push('Empty'); row.push('Empty'); break;
			case '|  ': row.push('Wall'); row.push('Empty'); break;
			case '+  ': row.push('Wall'); row.push('Empty'); break;
			default: break;
		}
		// Detect start and goal squares
		if (row.length == 2 && row[0] =='Empty') { 
			row[0] = 'Start'; 
			mazeObject.startingLocation = [0, mazeObject.dataArray.length];
		}
		if (row.length == q+1 && row[q-1] =='Empty') { row[q-1] = 'Goal' }
		// Operations to setup the next row
		if (row.length >= q+1) {
			// Remove the last square because we created some junk data to simplify importing
			row.pop();
			// Add the rows
			mazeObject.dataArray.push(row); 
			// Clear the array for the next row
			row = []; 
		}
	}
	return mazeObject;
}








function createTile(targetLayer, filepath, xPosition, yPosition) {
	var sprite = new cc.Sprite(filepath);
	sprite.attr({
		x: xPosition,
		y: yPosition,
	});
	targetLayer.addChild(sprite, 0);
	return sprite;
}








function drawMazeGrid(targetLayer, mazeObject) {
	for (var i=0; i<mazeObject.dataArray.length; i++) {
		for (var j=0; j<mazeObject.dataArray[i].length; j++) {
			var tileType;
			switch (mazeObject.dataArray[i][j]) {
				case 'Empty': tileType = res.path_png; break;
				case 'Wall': tileType = res.wall_png; break;
				case 'Goal': tileType = res.path_png; break;
				case 'Start': tileType = res.path_png; break;
			}
			// Y axis draws backwards because cocos' origin is in the lower left
			createTile(targetLayer, tileType, (25*j)+25, ((mazeObject.dataArray.length*25)-(25*i)));
		}
	}
}








function createPlayer(targetLayer, mazeObject) {
	var x = mazeObject.startingLocation[0];
	var y = mazeObject.startingLocation[1];
	mazeObject.playerSprite = createTile(targetLayer, res.player_png, 25, ((mazeObject.dataArray.length*25)-(25*y)));
}








function animateSolution(targetLayer, mazeObject) {
	var pixels = 25;	// pixels per movement step
	var speed = 0.35; 	// seconds per movement step

	for (var i=0; i<mazeObject.shortestPath.length; i++) {
		var xDelta = 0;
		var yDelta = 0;
		switch (mazeObject.shortestPath[i]) {
			case "North": yDelta = pixels; break;
			case "South": yDelta = -pixels; break;
			case "East": xDelta = pixels; break;
			case "West": xDelta = -pixels; break;
			default: break;
		}
		setTimeout(move, speed*1000*i, xDelta, yDelta);
	}

	function move(xDelta, yDelta) {
		var x = mazeObject.playerSprite.getPositionX();
		var y = mazeObject.playerSprite.getPositionY();
		// Square-by-square teleporting
		// mazeObject.playerSprite.setPosition(x+xDelta, y+yDelta);
		// Smoothly animated movement
		var q = cc.MoveTo.create(speed, cc.p(x+xDelta, y+yDelta));
   		mazeObject.playerSprite.runAction(q);
	}
}