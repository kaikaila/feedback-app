// 老师示范甚至没有这个server.js文件，
// 这个文件的诞生是 老师的server天然接收x-www-form-urlencoded，但我的只接受json格式
// json-server 默认期望接收到的请求体是 JSON 格式。你在 Postman 中发送的请求内容是类似于 rating=9&text=some feedback 的形式，这是 x-www-form-urlencoded 格式，而不是 JSON 格式。

// 由于 json-server 没有内置对 x-www-form-urlencoded 的解析支持，它会尝试将请求体直接解析为 JSON，这导致解析失败并报错。
// 现在chatgpt认为问题出在CORS
const express = require("express");
const cors = require("cors");
const app = express();

// 全局启用 CORS
app.use(
  cors({
    origin: "http://localhost:3000", // 允许的前端地址
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的 HTTP 方法
    credentials: true, // 如果需要传递 Cookie 或认证信息
  })
);

// 支持 x-www-form-urlencoded 和 JSON 格式请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 定义 POST 路由
// app.post("/api/submit", (req, res) => {
//   const { rating, text } = req.body;
//   console.log("Received data:", req.body);
//   res.send(`Rating: ${rating}, Text: ${text}`);
// });
app.post("/feedback", (req, res) => {
  console.log(req.headers); // 打印请求头
  console.log(req.body); // 打印请求体
  res.status(201).json(req.body); // 返回请求体作为响应
});

// 启动服务器
const PORT = 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
