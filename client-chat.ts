var socket = require('socket.io-client')('https://6f79-93-22-148-167.ngrok.io/');
  const repl = require('repl');
  const chalk = require('chalk');
  let username: any = null;
  let room: any = "";
  let actuelRoom: any = "";
  let friend: any = "";
  let receiver: any = "";


    socket.on('connect', () => {
        console.log(chalk.blue('=== start chatting ==='))
        username = process.argv[2]
        socket.emit("check-room", username)
  })

    socket.on('message', (data: any) => {
        const { cmd, username, roomMsg } = data
        // console.log("actual room : "+room, "roomMsg : "+roomMsg,"oooooooo", "user name : "+username , "msg : "+cmd)
        if(room == roomMsg)
        console.log(chalk.green(username + ': ' + cmd.split('\n')[0])); 
  })

  socket.on('users-list', (username:any) => {
    username.forEach((e:any) => {
        console.log(e.username)
    });
  })
  
    socket.on('check-room-serv', (data: any) => {
      console.log(data == "" ? "you have to use a room" : "you are connected on "+data+" room")
        room = data;
    }) 
    socket.on('chat-history', (data: any) => {
       data.forEach((e:any) => {
           console.log(e)
       });
    })
  socket.on('emite', (data: any) => {
    console.log(data);
}) 

repl.start({
        prompt: '',
        eval: (cmd: any) => {
        let array =  cmd.split("::");
        if(array.length > 1){
        var commande =  array[0];
        room = array[1].split("\n")[0];
        }
        if (array[0] == "join-room") {
            socket.emit( commande, { username, room })
        } else if (array[0] == "add-friend") {
            friend = array[1]
            socket.emit( commande, { username, friend })
        } else if (array[0] == "create-room") {
            socket.emit( commande, { username, room })
        } else if (array[0] == "use-room") {
            actuelRoom = array[1]
            socket.emit( commande, { username, room })
        } else if (array[0] == "private-message") {
            receiver = array[1]
            socket.emit( commande, { username, receiver })
        } else if (array[0] == "users-list") {
            socket.emit( commande, { username, room })
        } else if (array[0] == "exit-room") {
            socket.emit( commande, { username, room })
            room = "";
        } else if (array[0] == "chat-history") {
            socket.emit( commande, { username, room })
        } else {
            cmd = cmd.split("\n")[0];
            socket.send({ message:cmd, username, room })
        }
      }
  })

  export {}
