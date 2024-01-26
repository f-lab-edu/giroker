import { z } from "zod";
import { API_ENDPOINT } from "~/constants/env";

type Activity = {
  id: string;
  name: string;
  description: string;
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

async function createActivity({ body }: { body: Omit<Activity, "id"> }) {
  await fetch(`${API_ENDPOINT}/${ACTIVITES}`, {
    cache: "no-store",
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d) => d.json());
}

async function getActivities(): Promise<Activity[]> {
  const result = await fetch(`${API_ENDPOINT}/${ACTIVITES}`, {
    cache: "no-store",
  }).then((d) => d.json());

  return result.data;
}

export {
  type Activity,
  type ActivitySchema,
  activitySchema,
  createActivity,
  getActivities,
};
