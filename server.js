const express = require("express");
const app = express();

// 支持 x-www-form-urlencoded 和 JSON 格式请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 定义 POST 路由
app.post("/api/submit", (req, res) => {
  const { rating, text } = req.body;
  console.log("Received data:", req.body);
  res.send(`Rating: ${rating}, Text: ${text}`);
});

// 启动服务器
const PORT = 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
