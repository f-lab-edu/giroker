import { HttpResponse, http } from "msw";
import { Activity } from "~/models/activity";

const activities = [
  {
    id: "1",
    name: "사이드 프로젝트/giroker",
    description: "시간단위로 기록하는 프로젝트",
  },
];

const getActivityList = http.get("/activities", () => {
  const result = activities;
  return HttpResponse.json({ data: result });
});

const postActiviy = http.post("/activities", async ({ request }) => {
  const result = (await request.json()) as Activity;

  activities.unshift({
    id: activities[activities.length - 1].id + 1,
    name: result.name,
    description: result.description,
  });
  return HttpResponse.json({ status: 201 });
});

export const handlers = [getActivityList, postActiviy];
