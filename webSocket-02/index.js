const { WebSocketServer } = require("ws");

// 创建websocket服务器
// 客户端可以通过127.0.01:8080 访问该服务器
const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log("WebSocketServer 服务器已经在 127.0.01:8080 启动");
});

// 有新的连接
wss.on("connection", (ws) => {
  console.log("有新的连接");
  // 接收客户端消息
  ws.on("message", (data) => {
    let dataMessage = data.toString();
    console.log("接收客户端信息:" + dataMessage);
    // 发送消息给客户端
    ws.send("我收到了你发的消息是：" + dataMessage);
  });
});
