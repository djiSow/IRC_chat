var http = require('http');


var server = http.createServer(this);
var port = 3000

const stuffCtrl = require('./Controller/stuff');
const roomCtrl = require('./Controller/room');
const msgCtrl = require('./Controller/messages');

var io = require('socket.io')(server);



io.on('connection', (socket: any) => {
    console.log('a user just connected')
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.on('disconnect', (evt: any) => {
        console.log('some people left')
    })

    socket.on("check-room", (username:any) =>{
        roomCtrl.checkRoom(username, (data:any) =>{
            io.to(socket.id).emit("check-room-serv", data)
        })
    });
    
    socket.on("create-room", ({username, room}:any) => {
        console.log(username,room)
        roomCtrl.createThing(username, room, (data:any) => {
            io.to(socket.id).emit("emite", data)
        })
        
      });
    
    socket.on("use-room", ({username, room}:any) =>{
        roomCtrl.addUser(username, room.split('\n')[0], (data:any) =>{
            io.to(socket.id).emit("emite", data)
        })
    });
    
    
    socket.on("exit-room", ({username, room}:any) => {
        roomCtrl.exUser(username, (data:any) =>{
            io.to(socket.id).emit("emite", data)
        })
    });
    
    socket.on("users-list", ({username, room}:any) => {
        stuffCtrl.getAllStuff((data:any) =>{
            io.to(socket.id).emit("emite", data)
        })
    });
    
    socket.on("private-message", ({username, room}:any) => {
        console.log(`new private chat : `)
    });
    
    socket.on("add-friend", ({username, room}:any) =>{
        console.log(`you added ${username} as your friend`)
    });

    socket.on("chat-history", ({username, room}:any) =>{
        msgCtrl.getAllStuff(room, (data:any) =>{
            io.to(socket.id).emit("chat-history", data)
        })
    });

    socket.on('message', ({ message, username, room }:any) => {
       var evt = {message, username, room}

       socket.broadcast.emit('message', {cmd:message, username:username, roomMsg:room})
        console.log(evt,"iiiiiiiiiiiii", room)
        msgCtrl.createThing(username, message, room, (data:any) =>{
            io.to(socket.id).emit("emite", data)
        })
    })
})





module.exports = io;

server.listen(port, () => console.log(`server listening on port: ${port}`))
export {};