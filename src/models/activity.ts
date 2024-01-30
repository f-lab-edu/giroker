import { z } from "zod";
import { API_ENDPOINT } from "~/constants/env";

type Status = "play" | "stop";

type Activity = {
  id: string;
  name: string;
  description: string;
  started_at: number;
  status: Status;
};

export const ACTIVITES = "activities";

type ActivitySchema = z.infer<typeof activitySchema>;

const activitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "1자 이상으로 설정해주세요" })
    .max(30, { message: "30자 이하로 설정해주세요" }),
  description: z.string().max(80, { message: "80자 이하로 설정해주세요" }),
});

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
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function startActivity({ activity }: { activity: Activity }) {
  await fetch(`${API_ENDPOINT}/${ACTIVITES}/${activity.id}/start`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
}

export {
  type Activity,
  type ActivitySchema,
  activitySchema,
  getActivity,
  getActivities,
  createActivity,
  startActivity,
};
