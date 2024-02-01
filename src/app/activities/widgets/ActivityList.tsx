import ListCard from "../features/ListCard";
import { getActivities } from "../model";

export default async function ActivityList() {
  const activities = await getActivities();

  if (!activities) {
    return <div>추가된 활동이 없어요</div>;
  }

  return (
    <ul className="w-full flex space-y-4 flex-col">
      {activities.map((activity) => (
        <li key={activity.id} className="w-full">
          <ListCard activity={activity} />
        </li>
      ))}
    </ul>
  );
}
