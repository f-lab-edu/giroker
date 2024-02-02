import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  startActivityAction,
  stopActivityAction,
} from "~/app/activities/action";

/**
 * ```ts
 * const time = useTimer({ now: 60 });
 *
 * time -> 00:01:00
 * ```
 */
export default function useTimer({ now }: { now: number }) {
  const [time, setTime] = useState(now);
  const [id, setId] = useState<NodeJS.Timeout>();
  const [status, setStatus] = useState<"play" | "pause">("play");

  const params = useParams();
  const activityId = params["activity-id"] as string;

  useEffect(() => {
    const id = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setId(id);

    startActivityAction({ activityId });

    return () => {
      clearInterval(id);
    };
  }, [activityId]);

  const secondsToHHMMSS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
  };

  const start = () => {
    const id = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setId(id);

    startActivityAction({ activityId });
  };

  const stop = () => {
    clearInterval(id);

    stopActivityAction({ activityId });
  };

  const toggleTimer = () => {
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

  return { time: secondsToHHMMSS(time), status, toggleTimer };
}
