"use client";

import { useState } from "react";
import { PlayIcon } from "~/components/icons";
import PauseIcon from "~/components/icons/PauseIcon";
import { Button } from "~/components/ui/button";

import useTimer from "~/hooks/useTimer";

export default function Timer({ now }: { now: number }) {
  const [status, setStatus] = useState<"play" | "pause">("play");

  const { time, start, stop } = useTimer({ now });

  const stopAndPlay = () => {
    if (status === "play") {
      stop();
      setStatus("pause");
      return;
    }

    if (status === "pause") {
      start();
      setStatus("play");
      return;
    }
  };

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
