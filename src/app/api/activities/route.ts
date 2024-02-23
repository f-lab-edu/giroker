import { getActivities } from "~/app/activities/model";
import { repository } from "~/app/activities/repository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  const when = params.get("when");
  const whenDate = when ? new Date(when) : new Date();

  const res = await getActivities({ date: whenDate, repository });
  return Response.json(res);
}
