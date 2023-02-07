const socket = io('http://localhost:3001');

// //Login and Logut records
socket.on("situation", (stuation) => {
    console.log(stuation);

    $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${stuation.username} 
            <p class="text">${stuation.message}
            </p>
            </div>`)



});

socket.on("joinRoom", (stuation) => {
    console.log(stuation);

    $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${stuation.username} 
            <p class="text">${stuation.message}
            </p>
            </div>`)


});



//****************************Chat Screen*************************/

//Get paramaters from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const roomURL = urlParams.get('room')
const usernameURL = urlParams.get('username')


$("#room-name").append(`<strong> ${roomURL} </strong> `)
$("#users").append(`<strong> ${usernameURL} </strong> `)


$(() => {
    $("#chat-form").submit((e) => {

        e.preventDefault();
        const msgInput = $("#msgInput").val()

        socket.emit('userInfo', { username: usernameURL, room: roomURL, message: msgInput });

        sendInfoMongo({ username: usernameURL, room: roomURL, message: msgInput })
    })
    getMessages(roomURL)
})




function sendInfoMongo(message) {
    $.post('http://localhost:3001/messages', message)
}




function getMessages(passedRoom) {
    $.get('http://localhost:3001/messages', (data) => {

        data.filter(returnedInfo => {
            return returnedInfo.room == passedRoom;
        }).map(info => {

            $("#chat-messages").append(`
            <div class="message">
            <p class="meta">${info.username} 
            <p class="text">${info.message}
            </p>
            </div>`)

        });

    })
}


document.getElementById('#leave-btn').addEventListener(onclick, () => {
    window.location.href = 'joinChat.html'
})





