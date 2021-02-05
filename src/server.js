const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.get('/', express.static(path.join(__dirname, 'public')));
app.get('/client.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/client.js'));
});

const wss = new WebSocket.Server({
  port: 9001
});

const chatHistory = [];

const sendMessage = () => {
  wss.clients.forEach(singleClient => {
    singleClient.send(JSON.stringify({messagesList: chatHistory, users: wss.clients.size }))
  });
}

wss.on('connection', function connection(ws) {

  sendMessage()
  ws.on('message', function incoming(message) {
    const clientResponse = JSON.parse(message);
    if (message.type === 'keepAlive') {
      sendMessage()
    } else {
      chatHistory.push(clientResponse)
      sendMessage()
    }
  });
});

app.listen('9000');
