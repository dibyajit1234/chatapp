import express from 'express';
import { createServer } from 'node:http';
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*',
    }
});

const room = 'group'

io.on('connection',(socket) => {
  console.log('a user connected',socket.id);

  socket.on('joinRoom',async(user)=>{
    console.log(user);

    await socket.join(room);

    socket.to(room).emit('roomNotice',user);
    
  });

  socket.on('chatMessage',(msg)=>{
    socket.to(room).emit('chatMessage',msg);
  })



});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(4600, () => {
  console.log('server running at http://localhost:4600');
});