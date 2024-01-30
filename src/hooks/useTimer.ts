import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { startActivity, stopActivity } from "~/models/activity";

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

    (async () => {
      await startActivity({ activityId, startedAt: Date.now() });
    })();

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

  const start = async () => {
    const id = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setId(id);

    await startActivity({ activityId, startedAt: Date.now() });
  };

  const stop = async () => {
    clearInterval(id);

    await stopActivity({ activityId, stoppedAt: Date.now() });
  };

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

  return { time: secondsToHHMMSS(time), status, stopAndPlay };
}
