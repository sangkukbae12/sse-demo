const express = require("express");
const { createSession } = require("better-sse");
const cors = require("cors");

const app = express();

app.use(cors());

app.get(
  "/sse",
  async (req, res, next) => {
    const session = await createSession(req, res);
    session.state = { tid: req.query.tid };
    res.sse = session;
    next();
  },
  async (_, res) => {
    if (res.sse.state.tid === "1") {
      res.sse.push({ classId: "10", status: "completed" }, "ping");
    }
  }
);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
