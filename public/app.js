let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#resetButton");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");
let countUsersConnected = document.getElementById("connectedUsers");


let numClicksUserText = document.getElementById("clicksUser");


const urlParams = new URLSearchParams(window.location.search);


const socket = io();

socket.on("usuario conectado", (data) => {
    usersConnected.innerText = data.usersConnected;
    countUsersConnected.innerText = data.usersConnected;
});

socket.on("Udisconnect", (data) => {
    usersConnected.innerText = data.usersConnected;
    countUsersConnected.innerText = data.countUsersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", urlParams.get("user"));
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.numClicks;
    countUsersConnected.innerText = data.countUsersConnected;

});


socket.on("new click", (data) => {
    numClicksText.innerText = data.numClicks;
});

sendButton.onclick = () => {
    socket.emit("click", "");
};

resetButton.onclick = () => {
    numClicksText.innerText = '0';
    numClicksUserText.innerText = '0';
    socket.emit("reset","");
}