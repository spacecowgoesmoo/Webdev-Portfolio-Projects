class Maze {
	constructor(txtFileInput) {
		// Initializing these early just for reference
		this.dataArray = []
		this.height = 1
		this.width = 1
		this.rawMazeData = ''
		this.startingLocation = ''
		this.shortestPath = []

		// Data processing begins here
		this.rawMazeData = txtFileInput
		this.stripEmptyLines()
		this.getMazeHeight()
		this.getMazeWidth()
		this.reformatTxtFile()
		this.parseTxtFile()
		this.shortestPath = dijkstrasAlgorithm(this)
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

	parseTxtFile() {
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
















class GameplayField {
	constructor(targetLayer, cowMaze) {
		// Initializing these early just for reference
		this.gameTiles = {};
		this.playerSprite;

		// Data processing begins here
		this.cowMaze = cowMaze;			// Temporarily store maze data
		this.drawMazeGrid(targetLayer);
		this.createPlayer(targetLayer);
		this.cowMaze = null;			// Clear the temp maze data
	}

	createTile(targetLayer, filepath, xPosition, yPosition) {
		var sprite = new cc.Sprite(filepath);
		sprite.attr({
			x: xPosition,
			y: yPosition,
		});
		targetLayer.addChild(sprite, 0);
		return sprite;
	}

	drawMazeGrid(targetLayer) {
		for (var i=0; i<this.cowMaze.dataArray.length; i++) {
			for (var j=0; j<this.cowMaze.dataArray[i].length; j++) {
				var tileType;
				switch (this.cowMaze.dataArray[i][j]) {
					case 'Empty': tileType = res.path_png; break;
					case 'Visited': tileType = res.path_png; break;
					case 'Wall': tileType = res.wall_png; break;
					case 'Goal': tileType = res.path_png; break;
					case 'Start': tileType = res.path_png; break;
				}
				// Y axis draws backwards because cocos' origin is in the lower left
				this.gameTiles += this.createTile(targetLayer, tileType, (25*j)+25, ((this.cowMaze.dataArray.length*25)-(25*i)));
			}
		}
	}

	createPlayer(targetLayer) {
		this.playerSprite = this.createTile(targetLayer, res.player_png, 0, 0);
		this.sendPlayerBackToStart(this.cowMaze)
	}

	sendPlayerBackToStart(cowMaze) {
		var y = cowMaze.startingLocation[1];
		this.playerSprite.setPosition(25, (cowMaze.dataArray.length*25)-(25*y));
	}
}
















function animateSolution(cowMaze, cowGameplayField) {
	var pixels = 25;	// pixels per movement step
	var speed = 0.35; 	// seconds per movement step

	for (var i=0; i<cowMaze.shortestPath.length; i++) {
		var xDelta = 0;
		var yDelta = 0;
		switch (cowMaze.shortestPath[i]) {
			case "North": yDelta = pixels; break;
			case "South": yDelta = -pixels; break;
			case "East": xDelta = pixels; break;
			case "West": xDelta = -pixels; break;
			default: break;
		}
		setTimeout(move, speed*1000*i, xDelta, yDelta);
		// Animation looping
		if (i == cowMaze.shortestPath.length-1) {
			setTimeout(restartAnimation, speed*1000*(i+2));
		}
	}

	function move(xDelta, yDelta) {
		var x = cowGameplayField.playerSprite.getPositionX();
		var y = cowGameplayField.playerSprite.getPositionY();
		// Square-by-square teleporting
		// cowGameplayField.playerSprite.setPosition(x+xDelta, y+yDelta);
		// Smoothly animated movement
		var q = cc.MoveTo.create(speed, cc.p(x+xDelta, y+yDelta));
   		cowGameplayField.playerSprite.runAction(q);
	}

	function restartAnimation() {
		cowGameplayField.sendPlayerBackToStart(cowMaze);
		animateSolution(cowMaze, cowGameplayField);
	}
}