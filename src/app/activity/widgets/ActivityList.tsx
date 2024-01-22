import { getActivities } from "~/models/activity";
import ListCard from "../features/ListCard";

export default async function ActivityList() {
  const activities = await getActivities();

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
