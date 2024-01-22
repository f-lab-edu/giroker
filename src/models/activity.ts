import { API_ENDPOINT } from "~/constants/env";

type Activity = {
  id: string;
  title: string;
  description: string;
};

const PATH = "activities";

const createActivity = async () => {
  await fetch(`${API_ENDPOINT}/${PATH}`, {
    cache: "no-store",
    method: "post",
  }).then((d) => d.json());
};

const getActivities = async (): Promise<Activity[]> => {
  const result = await fetch(`${API_ENDPOINT}/${PATH}`, {
    cache: "no-store",
  }).then((d) => d.json());

  return result.data;
};

export { type Activity, createActivity, getActivities };
