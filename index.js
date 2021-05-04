'use strict'
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {origin: "*"},
});

const cors = require("cors");
app.use(cors());

app.use(express.static("public"));
//let numClicksUserText = document.getElementById("clicksUser");

let usersConnected = 0;
let numClicks = 0;
let countUsersConnected = 0;
// escuchar conexiones
io.on("connection", (socket) => {
    usersConnected++;
    countUsersConnected++;


    socket.emit("numero de usuarios", {
        usersConnected,
        countUsersConnected,
        numClicks,
    });

    socket.on("click", () => {
        numClicks++;
        io.emit("new click", {

            numClicks,
        });
    });

    // detecta la desconexión y emite un evento al cliente con el username desconectado
    socket.on("disconnect", () => {
        usersConnected--;
        countUsersConnected--;
        socket.broadcast.emit("Udisconnect", {
            usersConnected,
            countUsersConnected,
        });
    });


    socket.on("reset", () => {
        numClicks = 0;
        //countUsersConnected = 0;
    });
});

const port = process.env.PORT || 3000;

http.listen(port);
