"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { PlayIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Activity, startActivity } from "~/models/activity";

export default function PlayButton(
  props: React.ComponentPropsWithoutRef<"button"> & { activity: Activity },
) {
  const { activity, ...rest } = props;

  const router = useRouter();

  async function handleStartActivity() {
    await startActivity({
      activityId: activity.id,
      startedAt: new Date().getTime(),
    });

    router.push(`/activities/${activity.id}`);
  }

  return (
    <Button {...rest} onClick={handleStartActivity}>
      <PlayIcon />
    </Button>
  );
}
