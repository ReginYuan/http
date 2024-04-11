const ws = require("nodejs-websocket");

// 定义总连接的用户数量
let count = 0;
// conn每个连接服务器的用户都有一个conn对象
const server = ws.createServer((conn) => {
  count++;
  conn.username = `用户${count}`;
  // 1.告诉所有的用户有人加入了聊天室
  broadcast(`${conn.username}进入了聊天室`);
  // 收到客户端消息
  conn.on("text", (data) => {
    // 2.把消息广播给所有用户,是哪个用户发了什么消息
    console.log("收到客户端信息：", data);
    broadcast(`${conn.username}:` + data);
  });
  // 关闭连接
  conn.on("close", () => {
    console.log("关闭连接");
    count--;
    // 3.告诉所有用户，有人离开了聊天室
    broadcast(`${conn.username}离开了聊天室`);
  });

  // 监听异常
  conn.on("error", (err) => {
    console.log("异常信息：", err);
  });
});

// 广播，给所有用户发消息
const broadcast = (message) => {
  console.log("广播消息：" + message);
  server.connections.forEach((conn) => {
    conn.send(message);
  });
};

// 启动服务器
server.listen(8080, () => {
  console.log("WebSocketServer 服务器已经在 127.0.01:8080 启动");
});
