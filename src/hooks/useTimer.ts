import { useEffect, useState } from "react";

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

  useEffect(() => {
    const id = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setId(id);

    return () => {
      clearInterval(id);
    };
  }, []);

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
  };

  const stop = () => {
    clearInterval(id);
  };

  return { time: secondsToHHMMSS(time), start, stop };
}
