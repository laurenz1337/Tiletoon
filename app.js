var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

app.use(express.static(path.join(__dirname + "/")));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

function Tile(size) {
    this.color = "white";
    this.size = size;
}

function Tilemap() {
    this.data = [];
}

Tilemap.prototype.generate = function(size, tileSize) {
    // reset the old array for safety
    this.data = [];
	this.size = size;
	this.tileSize = tileSize;

    for(var i = 0; i < size * size; i++) {
        this.data.push(new Tile(tileSize));
    }
}

Tilemap.prototype.TwoDToIndex = function(x, y) {
	return x + y * this.size;
}

var board = new Tilemap();

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });


    socket.on("startGame", function(data) {
        board.generate(data.fieldSize, data.tileSize);

        console.log(data);

        board.generate(data.boardSize, data.tileSize);

        io.emit("gameSetupComplete", { board: board, color: data.tileColor });
    });

    socket.on("paintTile", function(data) {
        if(data.index >= board.size * board.size) return;
        
        board.data[data.index].color = data.color;
        io.emit("paintTile", data);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
