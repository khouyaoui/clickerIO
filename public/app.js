let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#resetButton");

let id_user = document.getElementById("id_user");
let numClicksText = document.getElementById("clicksTxt");
let countUsersConnected = document.getElementById("connectedUsers");
let userAV = document.getElementById("MediaclicksUser");
let numClicksUserText = document.getElementById("clicksUser");

let numClicksUser = 0;
let userAVresult = 0;
const socket = io();
const ids = [];
let id = genID();
socket.on("usuario conectado", (data) => {
    id_user.innerText = id.toString();
    countUsersConnected.innerText = data.countUsersConnected;
});

socket.on("Udisconnect", (data) => {
    id_user.innerText = id.toString();
    countUsersConnected.innerText = data.countUsersConnected;
});

socket.on("numero de usuarios", (data) => {
    id_user.innerText = id.toString();
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
function genID(){
    while(ids.length < 50){
        var r = Math.floor(Math.random() * 1000) + 1;
        if(ids.indexOf(r) === -1) ids.push(r);
    }
    return r;
}