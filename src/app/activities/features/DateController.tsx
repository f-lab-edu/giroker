"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ControllDateCursor } from "../widgets/ActivityListPanel";

export default function DateController({
  date,
  controllDate,
}: {
  date: Date;
  controllDate(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>,
    cursor: ControllDateCursor,
  ): void;
}) {
  return (
    <div className="flex flex-col w-full ">
      <form>
        <div className="flex w-full justify-between items-center py-2">
          <Button
            variant="outline"
            onClick={(e) => controllDate(e, "yesterday")}
          >
            <ChevronLeftIcon className="w-3 h-3" />
          </Button>
          <div className="w-1/2 m-auto">
            <Input
              type="date"
              value={time(date)}
              onChange={(e) => controllDate(e, "calendar")}
            />
          </div>
          <Button
            variant="outline"
            onClick={(e) => controllDate(e, "tomorrow")}
          >
            <ChevronRightIcon className="w-3 h-3" />
          </Button>
        </div>
      </form>
    </div>
  );
}

const time = (date: Date) => {
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  return `${YY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}`;
};
