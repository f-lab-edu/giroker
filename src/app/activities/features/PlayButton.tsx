"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { PlayIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Activity } from "../model";
import { startActivityAction } from "../action";

export default function PlayButton(
  props: React.ComponentPropsWithoutRef<"button"> & { activity: Activity },
) {
  const { activity, ...rest } = props;

  const router = useRouter();

  function handleStartActivity() {
    startActivityAction({ activityId: activity.id });

    router.push(`/activities/${activity.id}`);
  }

  return (
    <Button {...rest} onClick={handleStartActivity}>
      <PlayIcon />
    </Button>
  );
}
