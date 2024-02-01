import { z } from "zod";
import { API_ENDPOINT } from "~/constants/env";

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
}: {
  activityId: Activity["id"];
}): Promise<Activity> {
  const result = await fetch(`${API_ENDPOINT}/${ACTIVITES}/${activityId}`, {
    cache: "no-store",
  }).then((d) => d.json());

  return result.data;
}

async function getActivities(): Promise<Activity[]> {
  const result = await fetch(`${API_ENDPOINT}/${ACTIVITES}`, {
    cache: "no-store",
  }).then((d) => d.json());

  return result.data.activities;
}

async function createActivity({ body }: { body: Omit<Activity, "id"> }) {
  await fetch(`${API_ENDPOINT}/${ACTIVITES}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
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
