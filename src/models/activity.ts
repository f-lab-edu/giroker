import { API_ENDPOINT } from "~/constants/env";

type Activity = {
  id: string;
  name: string;
  description: string;
};

export const ACTIVITES = "activities";

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

export { type Activity, createActivity, getActivities };
