// Sign Up
$(() => {
    $("#send").click(() => {

        sendUserMongo({
            username: $("#username").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            password: $("#password").val()
        })
    })

})

function sendUserMongo(user) {
    $.post('http://localhost:3001/user', user)
    window.location.href = 'sign_in.html'
}

// Sign in

$(() => {
    $("#login").click(() => {

        $.get('http://localhost:3001/user', (data) => {
            data.map(addUsers);
        })
    })

})


function addUsers(user) {
    if ($("#username").val() == user.username && $("#password").val() == user.password) {
        localStorage.setItem('logedInUser', user.username)
        window.location.href = 'joinChat.html'
    } else {
        document.getElementById('messages').innerHTML = "Failed"
    }
}
