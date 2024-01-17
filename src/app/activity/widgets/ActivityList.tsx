import type { Activity } from "~/models/activity";
import ListCard from "../features/ListCard";
import { API_ENDPOINT } from "~/constants/env";

export default async function ActivityList() {
  const result = await fetch(`${API_ENDPOINT}/activities`, {
    cache: "no-store",
  }).then((data) => data.json());

  const activities = result.data as Activity[];

  return (
    <ul className="w-full">
      {activities.map((activity) => (
        <li key={activity.id} className="w-full">
          <ListCard activity={activity} />
        </li>
      ))}
    </ul>
  );
}
