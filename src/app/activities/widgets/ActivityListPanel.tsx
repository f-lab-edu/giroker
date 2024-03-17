"use client";

import { useOptimistic } from "react";
import AddButton from "../features/AddButton";
import DateController from "../features/DateController";
import { Activity } from "../model";
import ActivityList from "./ActivityList";

export type ControllDateCursor = "calendar" | "yesterday" | "tomorrow";

export default function ActivityListPanel({
  date,
  activities,
}: {
  date: Date;
  activities: Activity[];
}) {
  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <DateController date={date} />
      <CurrentTaskTime activities={activities} />
      <hr className="text-gray-500 w-full" />
      <AddButtonAndActivityList activities={activities} />
    </div>
  );
}

function CurrentTaskTime({ activities }: { activities: Activity[] }) {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-sm ">현재 작업 시간</p>
      <p className="text-2xl">
        {milliSecondsToHHMMSS(
          activities.reduce((time, activity) => {
            return activity.stopped_at && activity.started_at
              ? time +
                  (new Date(activity.stopped_at).getTime() -
                    new Date(activity.started_at!).getTime())
              : time;
          }, 0),
        )}
      </p>
    </div>
  );
}

function AddButtonAndActivityList({ activities }: { activities: Activity[] }) {
  const [optimisticActivities, addOptimisticActivites] = useOptimistic(
    activities,
    (currentActivities, newActivity) => {
      return [newActivity, ...currentActivities] as Activity[];
    },
  );

  return (
    <>
      <AddButton addOptimisticActivites={addOptimisticActivites} />
      <ActivityList activities={optimisticActivities} />
    </>
  );
}

const milliSecondsToHHMMSS = (milliSeconds: number) => {
  const seconds = milliSeconds / 1000;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
};
