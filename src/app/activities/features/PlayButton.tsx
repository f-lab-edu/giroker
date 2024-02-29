import React from "react";
import { PlayIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Activity } from "../model";
import { startActivityAction } from "../action";

export default function PlayButton(
  props: React.ComponentPropsWithoutRef<"button"> & { activity: Activity },
) {
  const { activity, ...rest } = props;

  const startActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startActivityAction({ activityId: activity.id });
  };

  return (
    <Button {...rest} onClick={startActivity}>
      <PlayIcon />
    </Button>
  );
}
