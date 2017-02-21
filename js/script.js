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

function Tilemap() {
    this.data = [];
}

Tilemap.prototype.generate = function(size, tileSize) {
    // reset the old array for safety
    this.data = [];
    for(var i = 0; i < size * size; i++) {
        this.data.push(new Tile(tileSize));
    }
}


socket.on("gameSetupComplete", function(data) {
	$(".setupForm").remove();

	board = data.board;
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
	console.log(board);
	for(var i = 0; i < board.size; i++) {
		for(var b = 0; b < board.size; b++) {
			canvas.fillStyle = "green";
			canvas.fillRect(i * board.tileSize, b * board.tileSize, board.tileSize, board.tileSize);
		}
	}

}

