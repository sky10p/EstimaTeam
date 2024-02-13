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

const setPerson = (socket: Socket, name: string, room: string) => {
  const user = users.get(socket);
  if(user) {
    user.name = name;
    user.room = room;
    user.estimations = "";
    users.set(socket, user);
  }
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
  const usersInRoom = Array.from(users.values()).filter((user) => user.room === room);
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
    console.log(`User joined room ${room}`);
  });
  
  socket.on("name", (room: string, name: string) => {
      setPerson(socket, name,room);
      console.log(`User ${name} connected`);
      sendEstimations(room);
    }
  );

  socket.on("userEstimations", (room: string, estimations: string) => {
    setEstimations(socket, estimations);
    console.log(`User ${users.get(socket)?.name} sent estimations: ${estimations}`);
    sendEstimations(room);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    removeUser(socket);
  });

  console.log("Client connected");

});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});