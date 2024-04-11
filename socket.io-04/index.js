var http = require("http");
var fs = require("fs");
var app = http.createServer();

// 监听用户请求事件
app.on("request", (req, res) => {
  fs.readFile(__dirname + "/index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }
    res.writeHead(200);
    res.end(data);
  });
});

app.listen(8080, () => {
  console.log("服务器已经在 127.0.01:8080 启动");
});

// 创建socket.io实例
var io = require("socket.io")(app);
// 监听用户的连接的事件
io.on("connection", (socket) => {
  console.log("用户连接成功");
  // 服务端给浏览器发送消息
  socket.emit("send", { name: "ReginYuan" });
});
