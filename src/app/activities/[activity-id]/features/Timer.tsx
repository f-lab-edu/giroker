"use client";

import { PlayIcon, PauseIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import useTimer from "~/hooks/useTimer";
import { Activity } from "../../model";

export default function Timer({ activity }: { activity: Activity }) {
  const now = nowTime({ activity });

  const { time, status, toggleTimer } = useTimer({
    now,
    activity,
  });

  return (
    <>
      <div className="flex gap-x-4">
        <span suppressHydrationWarning className="text-2xl">
          {time}
        </span>
        <Button variant="outline" onClick={toggleTimer}>
          {status === "play" ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
      <hr className="text-gray-500 w-full" />
    </>
  );
}

function nowTime({ activity }: { activity: Activity }) {
  if (activity.status === "idle") {
    return 0;
  }

  if (activity.status === "playing" && activity.started_at) {
    return Date.now() - new Date(activity.started_at).getTime();
  }

  if (
    activity.status === "stopped" &&
    activity.stopped_at &&
    activity.started_at
  ) {
    return (
      new Date(activity.stopped_at).getTime() -
      new Date(activity.started_at).getTime()
    );
  }

  throw new Error("not exist status appeared");
}
