// https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052
import express from "express";
import cors from "cors";

const app = express();
const port = 9090;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

let count = 0;

const genId = () => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
};

const data = {
  activities: [
    {
      id: "0",
      name: "사이드 프로젝트/giroker",
      description: "시간단위로 기록하는 프로젝트",
    },
  ],
};

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));

app.get("/activities", (_, res) => {
  res.json({ data });
});

app.post("/activities", (req, res) => {
  data.activities.unshift({ id: genId(), ...req.body });
  res.status(201).end();
});
