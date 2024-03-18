import ListCard from "../features/ListCard";
import { Activity } from "../model";

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  if (!activities?.length) {
    return <div>추가된 활동이 없어요</div>;
  }

  const nowPlayingActivity = activities.filter(
    (activity) => activity.status === "playing",
  );

  return (
    <ul className="w-full flex space-y-4 flex-col">
      {nowPlayingActivity &&
        nowPlayingActivity.map((activity) => (
          <li key={activity.id}>
            <ListCard activity={activity} />
          </li>
        ))}

      {activities.map((activity) => {
        if (activity.status === "playing") {
          return;
        }

        return (
          <li key={activity.id} className="w-full">
            <ListCard activity={activity} />
          </li>
        );
      })}
    </ul>
  );
}
