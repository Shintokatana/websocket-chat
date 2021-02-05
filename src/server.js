const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.get('/', express.static(path.join(__dirname, '../dist')));
app.get('/application.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/application.bundle.js'))
});

app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/manifest.json'))
})

app.get('/client.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/client.js'));
});

app.listen('9002');
const wss = new WebSocket.Server({ server: app, port: 9003 });


const chatHistory = [];
const sendMessage = (ws = null, type = null) => {
  wss.clients.forEach(singleClient => {
    if (singleClient !== ws) {
      singleClient.send(JSON.stringify({ messagesList: chatHistory, users: wss.clients.size }))
    }
  });
}

wss.on('connection',ws => {
  sendMessage()
  ws.on('message', message => {
    const clientResponse = JSON.parse(message);
    if (message.type === 'keepAlive') {
      sendMessage()
    } else {
      chatHistory.push(clientResponse)
      sendMessage(ws, )
    }
  });
});
