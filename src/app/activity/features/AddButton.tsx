"use client";

import { AddIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { createActivity } from "~/models/activity";

export default function ActivityAddButton() {
  return (
    <Button onClick={createActivity}>
      <AddIcon />
    </Button>
  );
}
