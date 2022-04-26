const express = require('express');
const path = require('path');
const {Server} = require('socket.io');
const model = require('./model');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
    
})

var server = app.listen(port,()=>{
    console.log('Successfully run!');
})

var io = new Server(server);


model.find({}, (err, doc)=>{
    var lastdoc = doc[doc.length-1];
    console.log(lastdoc.meta.length-1);
    var signaldata = lastdoc.meta[lastdoc.meta.length-1];
    io.on('connection', (socket)=>{
        io.sockets.emit('signal',{signal:signaldata});
    });
    if(err){
        console.log(err)
    }
    
});

