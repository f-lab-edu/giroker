import { z } from "zod";
import { API_ENDPOINT } from "~/constants/env";
import { ActivityRepository } from "./repository";

type Status = "idle" | "playing" | "stopped";

type Activity = {
  id: string;
  name: string;
  description: string;
  started_at: number;
  stopped_at: number;
  status: Status;
};

type ActivitySchema = z.infer<typeof activitySchema>;

const activitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "1자 이상으로 설정해주세요" })
    .max(30, { message: "30자 이하로 설정해주세요" }),
  description: z.string().max(80, { message: "80자 이하로 설정해주세요" }),
});

const ACTIVITES = "activities";

async function getActivity({
  activityId,
  repository,
}: {
  activityId: Activity["id"];
  repository: ActivityRepository;
}) {
  const result = await repository.findById({ activityId });

  return result;
}

async function getActivities({
  order = "desc",
  repository,
}: {
  order?: "asc" | "desc";
  repository: ActivityRepository;
}) {
  const result = await repository.findAll({ order });

  return result;
}

async function createActivity({
  activity,
  repository,
}: {
  activity: Omit<Activity, "id">;
  repository: ActivityRepository;
}) {
  await repository.save({ activity });
}

async function startActivity({
  activityId,
  startedAt,
}: {
  activityId: Activity["id"];
  startedAt: Activity["started_at"];
}) {
  await fetch(`${API_ENDPOINT}/${ACTIVITES}/${activityId}/start`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startedAt }),
  });
}

async function stopActivity({
  activityId,
  stoppedAt,
}: {
  activityId: Activity["id"];
  stoppedAt: Activity["stopped_at"];
}) {
  await fetch(`${API_ENDPOINT}/${ACTIVITES}/${activityId}/stop`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stoppedAt }),
  });
}

export {
  type Activity,
  type ActivitySchema,
  activitySchema,
  ACTIVITES,
  getActivity,
  getActivities,
  createActivity,
  startActivity,
  stopActivity,
};
