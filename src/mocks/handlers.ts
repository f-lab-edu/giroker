import { HttpResponse, http } from "msw";

const getActivityList = http.get("/activities", () => {
  const result = [
    {
      id: "1",
      title: "사이드 프로젝트/giroker",
      description: "시간단위로 기록하는 프로젝트",
    },
  ];

  return HttpResponse.json({ data: result });
});

const postActiviy = http.post("/activities", () => {
  return HttpResponse.json({ status: 201 });
});

export const handlers = [getActivityList, postActiviy];
