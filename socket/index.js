const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//when connect

io.on("connection", (socket) => {
  console.log("a user connected");

  //take event from server
  socket.on("add_user", (userId) => {
    // geting userId from client and send it to the user Array but only once
    addUser(userId, socket.id);

    //send back the users array to client
    io.emit("getUsers", users);
  });

  //send and get Message
  //message come from the client 
  socket.on("send_message", ({ senderId, recieverId, text }) => {
    const user = getUser(recieverId);

    if(user && user.socketId){
        //server distributing this message to specific user using recieverId
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });

    }
    
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    //send back the filterd users to client
    io.emit("getUsers", users);
  });
});
