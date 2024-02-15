import {Server, Socket} from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});


type UserInfo = {
  name: string;
  room: string;
  estimations: string;
}
const users = new Map<Socket, UserInfo>();
const rooms = new Map<Socket, string>();

const setPerson = (socket: Socket, name: string) => {
  const user = users.get(socket);
  if(user) {
    user.name = name;
    users.set(socket, user);
  } else {
    users.set(socket, {name, room: "", estimations: ""});
  }
}

const setRoom = (socket: Socket, room: string) => {
 rooms.set(socket, room);
}

const setEstimations = (socket: Socket, estimations: string) => {
  const user = users.get(socket);
  if(user) {
    user.estimations = estimations;
    users.set(socket, user);
  }
}

const removeUser = (socket: Socket) => {
  users.delete(socket);
}

const sendEstimations = (room: string) => {
  const usersInRoom = Array.from(users.keys()).filter((socket) => socket.rooms.has(room)).map((socket) => users.get(socket) as UserInfo);
  if(usersInRoom.length === 0) {
    return;
  }
  const estimations = JSON.stringify(usersInRoom.map((user) => {
    return {name: user.name, estimations: user.estimations}
  }));
  io.to(room).emit("estimations", estimations);

}


io.on("connection", (socket: Socket) => {

  socket.on("join", (room: string) => {
    socket.join(room);
    setRoom(socket, room);
    console.log(`User joined room ${room}`);
  });
  
  socket.on("name", (name: string) => {
      setPerson(socket, name);
      console.log(`User ${name} connected`);
      const currentRoom = rooms.get(socket);
      if(!currentRoom) {

        return;
      }
      sendEstimations(currentRoom);
      console.log(`User ${name} sent estimations in room ${currentRoom}`);
    }
  );

  socket.on("userEstimations", (estimations: string) => {
    setEstimations(socket, estimations);
    const currentRoom = rooms.get(socket);
    if(!currentRoom) {
      return;
    }
    sendEstimations(currentRoom);
    console.log(`User ${users.get(socket)?.name} sent estimations in room ${currentRoom}: ${estimations}`);
    
      });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const userName = users.get(socket)?.name;
    removeUser(socket);
    const currentRoom = rooms.get(socket);
    if(!currentRoom) {
      return;
    }
    sendEstimations(currentRoom);
    console.log(`User ${userName} disconnected from room ${currentRoom}`);
   
  });

  console.log("Client connected");

});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});