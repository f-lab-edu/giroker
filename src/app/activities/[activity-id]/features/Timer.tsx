"use client";

import { PlayIcon, PauseIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import useTimer from "~/hooks/useTimer";

export default function Timer() {
  const { time, status, stopAndPlay } = useTimer({ now: 0 });

  return (
    <>
      <div className="flex gap-x-4">
        <span className="text-2xl">{time}</span>
        <Button variant="outline" onClick={stopAndPlay}>
          {status === "play" ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
      <hr className="text-gray-500 w-full" />
    </>
  );
}
