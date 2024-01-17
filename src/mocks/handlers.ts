import { HttpResponse, http } from "msw";

const getActivityList = http.get("getActivityList", () => {
  const result = [{ id: "1" }];

  return HttpResponse.json(result);
});

const handlers = [getActivityList];

export { handlers };
