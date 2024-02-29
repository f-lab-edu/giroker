import React from "react";
import { PauseIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Activity } from "../model";
import { stopActivityAction } from "../action";

export default function StopButton(
  props: React.ComponentPropsWithoutRef<"button"> & { activity: Activity },
) {
  const { activity, ...rest } = props;

  const stopActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    stopActivityAction({ activityId: activity.id });
  };

  return (
    <Button {...rest} onClick={stopActivity}>
      <PauseIcon />
    </Button>
  );
}
