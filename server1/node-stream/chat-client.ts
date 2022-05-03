var socket = require('socket.io-client')('http://localhost:3000');
  const repl = require('repl')
  let username: any = null
  let room: any = ""
  let friend: any = ""
  let receiver: any = ""

    socket.on('disconnect', function() {
        socket.emit('disconnect')
  });

    socket.on('connect', () => {
        console.log('=== start chatting ===')
        username = process.argv[2]
  })

    socket.on('message', (data: any) => {
        const { cmd, username } = data
        console.log(username + ': ' + cmd.split('\n')[0]);
  }) 

repl.start({
        prompt: '',
        eval: (cmd: any) => {
        let array =  cmd.split(" ");
        if (array[0] == "join-room") {
            room = array[1]
            socket.send({ cmd, username, room })
            console.log(username + ': ' + array[0], room)
        } else if (array[0] == "add-friend") {
            friend = array[1]
            socket.send({ cmd, username, friend })
            console.log(username + ': ' + array[0], friend)
        } else if (array[0] == "create-room") {
            room = array[1]
            socket.send({ cmd, username, room })
            console.log(username + ': ' + array[0], room)
        } else if (array[0] == "private-message") {
            receiver = array[1]
            socket.send({ cmd, username, receiver })
            console.log(username + ': ' + array[0], room)
        } else if (array[0] == "users-list") {
            room = array[1]
            socket.send({ cmd, username, room })
            console.log(username + ': ' + array[0], room)
        } else if (array[0] == "delete-room") {
            room = array[1]
            socket.send({ cmd, username, room })
            console.log(username + ': ' + array[0], room)
        } else if (array[0] == "chat-history") {
            room = array[1]
            socket.send({ cmd, username, room })
            console.log(username + ': ' + array[0], room)
        } else {
            socket.send({ cmd, username, room })
        }
      }
  })