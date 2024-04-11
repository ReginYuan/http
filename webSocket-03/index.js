const ws = require("nodejs-websocket");
/**
 *分析
 *消息不应该是简单的字符串，这一个消息应该是一个对象
 *count:用户总数
 *type: 消息类型 TYPE_ENTER：表示进入聊天室的消息 TYPE_MSG:正常的聊天消息 TYPE_LEAVE:用户离开聊天室的消息
 *msg:消息内容
 *time:聊天消息的时间
 */
// 定义总连接的用户数量
let count = 0;
// 定义消息类型
const TYPE_ENTER = 0; //用户进入聊天室的消息
const TYPE_LEAVE = 1; //用户离开聊天室的消息
const TYPE_MSG = 2; //用户正常聊天消息
// conn每个连接服务器的用户都有一个conn对象
const server = ws.createServer((conn) => {
  count++;
  conn.username = `用户${count}`;
  // 1.告诉所有的用户有人加入了聊天室
  broadcast({
    type: TYPE_ENTER,
    msg: `${conn.username}进入了聊天室`,
    time: new Date().toLocaleTimeString()
  });

  // 收到客户端消息
  conn.on("text", (data) => {
    // 2.把消息广播给所有用户,是哪个用户发了什么消息
    console.log("收到客户端信息：", data);
    broadcast({
      type: TYPE_MSG,
      msg: `${conn.username}:` + data,
      time: new Date().toLocaleTimeString()
    });
  });

  // 关闭连接
  conn.on("close", () => {
    console.log("关闭连接");
    count--;
    // 3.告诉所有用户，有人离开了聊天室
    broadcast({
      type: TYPE_LEAVE,
      msg: `${conn.username}离开了聊天室`,
      time: new Date().toLocaleTimeString()
    });
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
    conn.send(JSON.stringify(message));
  });
};

// 启动服务器
server.listen(8080, () => {
  console.log("WebSocketServer 服务器已经在 127.0.01:8080 启动");
});
