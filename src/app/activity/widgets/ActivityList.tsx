"use client";

import { useGetActivities } from "~/models/quries";
import ListCard from "../features/ListCard";

export default function ActivityList() {
  const { data: activities } = useGetActivities();

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
