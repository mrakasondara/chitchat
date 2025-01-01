const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const { getChat, sendMessage } = require("./firebase/chat/chat");
const { addStatus, getStatuses } = require("./firebase/status/status");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET,POST"],
  },
});
const port = process.env.port || 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.get("/api/", (req, res) => {
  try {
    res.header(
      "Access-Control-Allow-Origin",
      "https://chitchat-snowy.vercel.app/"
    );
    res.send("server listening").status(200);
  } catch (err) {
    res.send("something error").status(400);
  }
});

io.on("connect", (socket) => {
  socket.on("join", async ({ userId, targetId, chatId }, callback) => {
    socket.join(chatId);

    const myChat = await getChat({ chatId, userId });
    const targetChat = await getChat({ chatId, userId: targetId });

    socket.emit("message", {
      user: userId,
      message: `welcome to chat ${chatId},`,
    });

    socket.broadcast.to(chatId).emit("messageData", { user: userId });

    io.to(chatId).emit("messageData", {
      message: [...myChat, ...targetChat],
    });
    callback();
  });
  socket.on(
    "sendMessage",
    async ({ message, chatId, userId, targetId }, callback) => {
      await sendMessage({ chatId, myId: userId, targetId, message });
      const myChat = await getChat({ chatId, userId });
      const targetChat = await getChat({ chatId, userId: targetId });

      io.to(chatId).emit("messageData", {
        message: [...myChat, ...targetChat],
      });

      callback();
    }
  );

  socket.on("join", async ({ userId }, callback) => {
    socket.join(userId);

    socket.broadcast.to(userId).emit("statusData", { user: userId });

    const statuses = await getStatuses(userId);

    io.to(userId).emit("statusData", {
      statuses,
    });

    callback();
  });

  socket.on(
    "addStatus",
    async ({ image, desc, uid, displayName }, callback) => {
      await addStatus({ thumb: image, desc, uid, displayName });

      const statuses = await getStatuses(uid);

      io.to(uid).emit("statusData", {
        statuses,
      });
      callback();
    }
  );
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

module.exports = server;
