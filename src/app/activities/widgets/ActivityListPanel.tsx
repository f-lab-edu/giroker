"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { getBaseURL } from "~/constants/env";
import AddButton from "../features/AddButton";
import DateController from "../features/DateController";
import { Activity } from "../model";
import ActivityList from "./ActivityList";

export type ControllDateCursor = "calendar" | "yesterday" | "tomorrow";

export default function ActivityListPanel({
  activities,
}: {
  activities: Activity[];
}) {
  const [mounted, setMounted] = useState(false);
  const [_activities, setActivities] = useState(activities);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  const result = useSuspenseQuery({
    queryKey: ["activities", "list", date, mounted],
    queryFn: async () => {
      if (!mounted) {
        return _activities;
      }

      const res = await fetch(
        `${getBaseURL()}/api/activities?when=${dateToYYYY_MM_DD(date)}`,
      );

      const data = await res.json();

      return data;
    },
  });

  const controllDate = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>,
    cursor: ControllDateCursor,
  ) => {
    e.preventDefault();

    if (cursor === "calendar") {
      const target = e.target as HTMLInputElement;

      setDate(new Date(target.value));
    }

    if (cursor === "yesterday") {
      setDate((prev) => new Date(new Date(prev).setDate(prev.getDate() - 1)));
    }

    if (cursor === "tomorrow") {
      setDate((prev) => new Date(new Date(prev).setDate(prev.getDate() + 1)));
    }
  };

  useEffect(() => {
    setActivities(result.data);
  }, [date, result.data]);

  return (
    <Suspense fallback={undefined}>
      <div className="flex flex-col items-center w-full gap-y-4">
        <DateController date={date} controllDate={controllDate} />
        <CurrentTaskTime activities={_activities} />
        <hr className="text-gray-500 w-full" />
        <AddButton />
        <ActivityList activities={_activities} />
      </div>
    </Suspense>
  );
}

function CurrentTaskTime({ activities }: { activities: Activity[] }) {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-sm ">현재 작업 시간</p>
      <p className="text-2xl">
        {milliSecondsToHHMMSS(
          activities.reduce((time, activity) => {
            return activity.status === "stopped"
              ? time +
                  (new Date(activity.stopped_at!).getTime() -
                    new Date(activity.started_at!).getTime())
              : time;
          }, 0),
        )}
      </p>
    </div>
  );
}

const milliSecondsToHHMMSS = (milliSeconds: number) => {
  const seconds = milliSeconds / 1000;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
};

const dateToYYYY_MM_DD = (date: Date) =>
  new Date(date).toISOString().substring(0, 10);
