"use strict";

var socket = io();
var board;
var canvas;

/*
Game start
Can be triggered by either player
*/
$("form").submit(function() {
	socket.emit("startGame", { boardSize: parseInt($("#size").val()), tileSize: parseInt($("#tilesize").val()) });
	return false;
});

function Tile(size) {
    this.color = {r: 0, g: 0, b: 0};
    this.size = size;
}

function Tilemap(boardSize, tileSize) {
    this.data = [];
	this.size = boardSize || 0;
	this.tileSize = tileSize || 0;
}

Tilemap.prototype.generate = function(size, tileSize) {
    // reset the old array for safety
    this.data = [];
    for(var i = 0; i < size * size; i++) {
        this.data.push(new Tile(tileSize));
    }
}

Tilemap.prototype.TwoDToIndex = function(x, y) {
	return x + y * this.size;
}

socket.on("gameSetupComplete", function(data) {
	$(".setupForm").remove();

	board = new Tilemap();
	board.data = data.board.data;
	board.tileSize = data.board.tileSize;
	board.size = data.board.size;
	console.log(board);


	var elem = document.getElementById("board");
	canvas = elem.getContext("2d");
	elem.width = board.size * board.tileSize;
	elem.height = board.size * board.tileSize;

	window.requestAnimationFrame(update);
});

function update() {
	window.requestAnimationFrame(update);

	printBoard();
}

function printBoard() {
	//console.log(board);
	for(var i = 0; i < board.size; i++) {
		for(var b = 0; b < board.size; b++) {
			if ((i + b) % 2) {
				canvas.fillStyle = "#fc6563"
			} else {
				canvas.fillStyle = "white";
			}
			canvas.fillRect(i * board.tileSize, b * board.tileSize, board.tileSize, board.tileSize);
		}
	}
}

$('#board').mousemove(function(event) {
    var left = (event.pageX - $(this).offset().left);
    var top = (event.pageY - $(this).offset().top);

	console.log(board.TwoDToIndex(Math.floor(left / board.tileSize), Math.floor(top / board.tileSize)));
});
