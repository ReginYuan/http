const ws = require("nodejs-websocket");

// 创建websocket服务器
const server = ws.createServer((connect) => {
  console.log("有新的连接");
  // 接受用户消息
  connect.on("text", (data) => {
    console.log("接受用户信息：", data);
    //给用户发送一个响应数据，将用户小写的信息转为大写
    connect.sendText("我收到了你发的消息是：" + data.toUpperCase());
  });
  // 只要websocket关闭连接，就触发close事件
  connect.on("close", () => {
    console.log("关闭连接");
  });
  connect.on("error", (err) => {
    console.log("连接出错", err);
  });
});

// 监听客户端连接
server.listen(8080, () => {
  console.log("WebSocketServer 服务器已经在 127.0.01:8080 启动");
});
