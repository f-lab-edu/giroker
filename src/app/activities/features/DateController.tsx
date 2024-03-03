"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DateController({ date }: { date: Date }) {
  const router = useRouter();

  const krTime = 9 * 60 * 60 * 1000;
  const yesterday = dateToYYYYMMDD(
    new Date(date.getTime() + krTime - 24 * 60 * 60 * 1000),
  );
  const tomorrow = dateToYYYYMMDD(
    new Date(date.getTime() + krTime + 24 * 60 * 60 * 1000),
  );
  return (
    <div className="flex flex-col w-full ">
      <form>
        <div className="flex w-full justify-between items-center py-2">
          <Link href={`/?date=${yesterday}`}>
            <Button variant="outline">
              <ChevronLeftIcon className="w-3 h-3" />
            </Button>
          </Link>
          <div className="w-1/2 m-auto">
            <Input
              type="date"
              value={time(date)}
              onChange={(e) => router.push(`?date=${e.currentTarget.value}`)}
            />
          </div>
          <Link href={`/?date=${tomorrow}`}>
            <Button variant="outline">
              <ChevronRightIcon className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const dateToYYYYMMDD = (date: Date) =>
  new Date(date).toISOString().substring(0, 10);

const time = (date: Date) => {
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  return `${YY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}`;
};
