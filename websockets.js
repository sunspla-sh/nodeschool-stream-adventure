const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8099');

const duplexStream = WebSocket.createWebSocketStream(ws);

duplexStream.write('hello\n');
duplexStream.pipe(process.stdout);