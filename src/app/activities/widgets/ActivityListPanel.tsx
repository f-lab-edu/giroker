"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import AddButton from "../features/AddButton";
import { Activity } from "../model";
import ActivityList from "./ActivityList";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type ControllDateCursor = "calendar" | "yesterday" | "tomorrow";

export default function ActivityListPanel({
  date,
  activities,
}: {
  date: Date;
  activities: Activity[];
}) {
  const router = useRouter();
  const yesterday = dateToYYYYMMDD(
    new Date(date.getTime() - 24 * 60 * 60 * 1000),
  );
  const tomorrow = dateToYYYYMMDD(
    new Date(date.getTime() + 24 * 60 * 60 * 1000),
  );

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <div></div>
      <div className="flex flex-col w-full ">
        <form>
          <div className="flex w-full justify-between items-center py-2">
            <Link href={`/?date=${yesterday}`}>
              <Button variant="outline">
                <ChevronLeftIcon className="w-3 h-3" />
              </Button>
            </Link>
            <div className="w-1/2 m-auto">
              <Input
                type="date"
                value={time(date)}
                onChange={(e) => router.push(`?date=${e.currentTarget.value}`)}
              />
            </div>
            <Link href={`/?date=${tomorrow}`}>
              <Button variant="outline">
                <ChevronRightIcon className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </form>
      </div>
      <CurrentTaskTime activities={activities} />
      <hr className="text-gray-500 w-full" />
      <AddButton initialActivities={activities} />
      <ActivityList activities={activities} />
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

const dateToYYYYMMDD = (date: Date) =>
  new Date(date).toISOString().substring(0, 10);

const time = (date: Date) => {
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  return `${YY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}`;
};
