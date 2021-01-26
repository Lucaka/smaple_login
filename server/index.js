// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// server.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
// server.get('*', function(req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })

const PORT = 8088
server.listen(PORT,() => console.log(`Listening on ${PORT}`))
console.log('success listen…………');


//ws 套件
// const SocketServer = require('ws').Server;
// //將 express 交給 SocketServer 開啟 WebSocket 的服務
// const wss = new SocketServer({ server });
//
// //當 WebSocket 從外部連結時執行
// wss.on('connection', ws => {
//
//   //連結時執行此 console 提示
//   console.log('Client connected');
//
//   //當 WebSocket 的連線關閉時執行
//   ws.on('close', () => {
//     console.log('Close connected')
//   })
//
//
//
//   ws.on('message', (e) => {
//     console.log( "Received Message: " + e);
//
//     // let msg = JSON.parse(e.data);
//
//     ws.send(e)
//
//   });
//
//   //取得所有連接中的 client
//   let clients = wss.clients;
//
//   //做迴圈，發送訊息至每個 client
//   clients.forEach(client => {
//     console.log( "clients " + client);
//   })
//
//
// })

