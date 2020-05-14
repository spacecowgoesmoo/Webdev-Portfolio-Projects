/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/




var testMazeLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		// Non-boilerplate code starts here
		var mazeObject = {
			dataArray: [],
			height: 1,
			width: 1,
			playerSprite: '',
			rawMazeData: '',
			startingLocation: '',
			shortestPath: []
		}

		// Note: Create new mazes with the right text editor or the format will be messed up
		// OSX TextEdit worked for me
		importTxtFile(this, mazeObject, 'res/mazes/maze1.txt');				// Import txt file

		function importTxtFile(targetLayer, mazeObject, myFile) {
			cc.loader.loadTxt(myFile, function(err, data) {
				if(err) return console.log("txt load failed");
				// success
				initializeGame(targetLayer, data)
			});
		}

		function initializeGame(targetLayer, data) {
			var cowMaze = new Maze(data)
			drawMazeGrid(targetLayer, cowMaze);
			createPlayer(targetLayer, cowMaze);
			mainGameLoop(targetLayer, cowMaze)
		}

		// Normally we would include recursion here, but since this game
		// is a non-playable non-repeating demonstration there's no need to
		function mainGameLoop(targetLayer, cowMaze) {
			animateSolution(targetLayer, cowMaze);
			console.log(cowMaze);
		}

		return true;
    }
});

var testMazeScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new testMazeLayer();
		this.addChild(layer);
	}
});