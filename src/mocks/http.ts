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

const PATHS = {
  activities: "activities",
};

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));

app.get(PATHS.activities, (_, res) => {
  res.json({ data });
});

app.post(PATHS.activities, (req, res) => {
  data.activities.unshift({ id: genId(), ...req.body });
  res.status(201).end();
});
