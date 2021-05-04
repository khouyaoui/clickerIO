let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#resetButton");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");
let countUsersConnected = document.getElementById("connectedUsers");
let userAV = document.getElementById("MediaclicksUser");
let numClicksUserText = document.getElementById("clicksUser");
const urlParams = new URLSearchParams(window.location.search);

let numClicksUser = 0;
let userAVresult = 0;
const socket = io();

socket.on("usuario conectado", (data) => {
    usersConnected.innerText = data.usersConnected;
    countUsersConnected.innerText = data.countUsersConnected;
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
    numClicksUserText.innerText = numClicksUser.toString();
    userAV.innerText = ((numClicksUser / data.numClicks)*100).toString()+" %";

});

sendButton.onclick = () => {
    numClicksUser++;
    socket.emit("click", "");
};

resetButton.onclick = () => {
    numClicksText.innerText = '0';
    numClicksUserText.innerText = '0';
    userAV.innerText = '0.0';
    numClicksUser = 0;
    userAVresult = 0;
    socket.emit("reset","");
}