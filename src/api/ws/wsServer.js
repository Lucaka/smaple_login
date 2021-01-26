//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 8088

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
let server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
// server.listen(PORT, () => console.log(`Listening on ${PORT}`))
//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

  //連結時執行此 console 提示
  console.log('Client connected');

  //當 WebSocket 的連線關閉時執行
  ws.on('close', () => {
    console.log('Close connected')
  })



  ws.on('message', (e) => {
    console.log( "Received Message: " + e);

    // let msg = JSON.parse(e.data);

    ws.send(e)

  });

  //取得所有連接中的 client
  let clients = wss.clients;

  //做迴圈，發送訊息至每個 client
  clients.forEach(client => {
    console.log( "clients " + client);
  })


})