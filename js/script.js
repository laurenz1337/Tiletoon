var socket = io();
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

var board;


socket.on("gameSetupComplete", function(data) {
	$(".setupForm").remove();

	board = data.board;
	console.log(board);

	printBoard();
});

function printBoard(i_BoardSize, i_TileSize) {
	// TODO: Print board


	/* OLD IMPLEMENTATION */
	// var maxRow = parseInt(i_BoardSize);
	// var maxCol = parseInt(i_BoardSize);
	// var tileHeight = parseInt(i_TileSize) - 2;
	// var tileWidth = parseInt(i_TileSize);
	// var num = 1;
	// $('#board').remove();
	// $('.colorwrapper').remove();
	// var table = $("<table id=\"board\" oncontextmenu=\"return false\"></table>").appendTo(".wrapper");
	// var color = $("<div class='colorwrapper'><div class='red' /><div class='white' /></div>").appendTo(".wrapper");
	// var color = 0;
	// $('.red').click(function() {
	// 	color = 1;
	// });
	// $('.white').click(function() {
	// 	color = 0;
	// });
	//
	// /*$('#board').click(function (e) { //Relative ( to its parent) mouse position
	// 	var posX = $(this).position().left,
	// 	posY = $(this).position().top;
	// 	console.log((e.pageX - posX) + ' , ' + (e.pageY - posY));
	//
	// 	var clickedXTile = parseInt(((e.pageX - posX) / (tileWidth)) + 1);
	// 	var clickedYTile = parseInt(((e.pageY - posY) / (tileHeight)) + 1);
	// 	clickedTile = clickedXTile * clickedYTile;
	// 	console.log(clickedXTile + " , " + clickedYTile + " , " + clickedTile);
	// });*/
	//
	// var colgroup = $('<colgroup></colgroup>').appendTo(table);
	// for (var row = maxRow - 1; row >= 0; row--) {
	// 	var myRow = $("<tr></tr>").appendTo(table);
	// 	halfBoard = myRow.slice(0, Math.floor(myRow.length/2));
	// 	console.log(myRow.length);
	// 	var colgrpitem = $('<col style="width:' + tileWidth + 'px;">').appendTo(colgroup);
	// 	for (var col = 0; col < maxCol; col++) {
	// 		myRow.append("<td style='height:" + tileHeight + "px'>" + num + "</td>");
	// 		num++;
	// 	};
	// };
	//
	// $('#board tr td').click(function() {
	// 	if(color != 1)
	// 		$(this).css('background-color', '#ffffff');
	// 	else {
	// 		$(this).css('background-color', '#FC6563');
	// 	};
	// 	socket.emit('tile', $(this).text());
	// 	socket.emit('color', color);
	// 	return false;
	// });
	//
	// socket.on('tile', function(tile){
	// 	socket.on('color', function(color) {
	// 		console.log(color + " , " + tile);
	// 		if(color != 1) {
	// 			$('#board tr td:contains(' + tile + ')').css('background-color', '#ffffff');
	// 		} else {
	// 			$('#board tr td:contains(' + tile + ')').css('background-color', '#FC6563');
	// 		};
	// 	});
	// });
}

