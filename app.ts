
   
   const stuffCtrl = require('./Controller/stuff');

const io = require('socket.io')(http);
const express = require('express');
const stuffRoutes = require('./Route/stuff');
const roomRoutes = require('./Route/room');
const messageRoutes = require('./Route/messages');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("mydb", "root", "193705", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  sequelize.query("SELECT * FROM Users").then(([results, metadata]:any) => {
      console.log(results);
    })
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}


//bug cors


/* const bodyParser = require('body-parser');

io.use(bodyParser.json());
io.use('/api/stuff', stuffRoutes);
io.use('/api/room', roomRoutes);
io.use('/api/message', messageRoutes);
 */



io.on('connection', (socket: any) => {
    console.log('a user just connected')
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.on('disconnect', (evt: any) => {
        console.log('some people left')
    })
    
    socket.on("create-room", (room: any) => {
        stuffCtrl.getAllStuff().then((item:any)=>{

        console.log(item);
        })
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





module.exports = io;
export {};