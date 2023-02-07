var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors')
const path = require('path')

const userRouter = require('./routes/UserRoutes')
const privateMessageRouter = require('./routes/PrivateMessageRoutes')

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, '/')))
app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
  res.send("Chat Server running...")
})

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

var Message = mongoose.model('Message', {
  username: String,
  message: String,
  room: String
})

var dbUrl = 'mongodb+srv://101213098:hbOnO94S3DzPEsPb@cluster0.zq8k00c.mongodb.net/LabTest1?retryWrites=true&w=majority'

var message;

app.post('/messages', (req, res) => {

  message = new Message(req.body);

  message.save((err) => {
    if (err) {
      console.log(err)
    }
    res.sendStatus(200);
  })
})

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})
const users = [];

io.on('connection', (socket) => {
  console.log(`New user joined: ${socket.id}`)
  socket.emit("situation", ({ username: '', message: `Welcome` }))
  socket.broadcast.emit("joinRoom", ({ username: `New user joined: ${users[0]}`, message: '' }))

  socket.on('userInfo', ({ username, room, message }) => {
    users.push(username)
    socket.join(room)
    socket.broadcast.to(room).emit("joinRoom", ({ username, room, message }))
    socket.emit("joinRoom", ({ username, room, message }))
  });

  socket.on("disconnect", () => {
    io.emit("situation", ({ username: '', message: `The user left the room` }))
  })

})

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('MDB', err);
  } else {
    console.log('Success');
  }
})

app.use(userRouter);
app.use(privateMessageRouter);

server.listen(3001, () => {
  console.log('Server is running on port', server.address().port);
});


