const http = require('http').createServer();
const io = require('socket.io')(http);
var port = 3000

http.listen(port, () => console.log(`server listening on port: ${port}`))

io.on('connection', (socket: any) => {
    console.log('a user just connected')
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.on('disconnect', (evt: any) => {
        console.log(`${socket.id} left`)
    })
    
    socket.on("create-room", (room: any) => {
        console.log(`room ${room} was created`);
      });
    
    socket.on("join-room", (room: any) => {
        console.log(`you just joined ${room} room`);
    });
    
    socket.on("delete-room", (room: any) => {
        console.log(`you left ${room} room`);
    });
    
    socket.on("users-list", (evt: any) => {
        console.log(`users on server : ${evt}`);
    });
    
    socket.on("private-message", (evt: any, user:String) => {
        console.log(`new private chat : `)
    });
    
    socket.on("add-friend", (name: any) =>{
        console.log(`you added ${name} as your friend`)
    });

    socket.on("chat-history", (evt: any) =>{
        console.log(evt)
    });

    socket.on('message', (evt: any, nickname:String,) => {
        console.log(evt)
        socket.broadcast.emit('message', evt)
    })
})

