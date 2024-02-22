"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "~/components/ui/button";

export default function DateController() {
  return (
    <div className="flex w-full justify-between items-center pb-2">
      <Button variant="outline">
        <ChevronLeftIcon className="w-3 h-3" />
      </Button>
      <p className="text-lg">{today()}</p>
      <Button variant="outline">
        <ChevronRightIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}

const today = () => {
  const today = new Date();

  return `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
};
