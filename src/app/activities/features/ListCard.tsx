import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PlayButton from "./PlayButton";
import { type Activity } from "../model";
import StopButton from "./StopButton";
import Link from "next/link";

export default function ListCard({ activity }: { activity: Activity }) {
  return (
    <Link href={`/activities/${activity.id}`}>
      <Card className="w-full">
        <CardHeader>
          {activity.status === "playing" && (
            <p className="text-gray-500 text-end text-xs">현재 작업중</p>
          )}
          <CardTitle>{activity.name}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {activity.started_at && (
            <p className="text-gray-500 text-xs">
              시작시각: {HHMMSS(activity.started_at)}
            </p>
          )}
          {activity.stopped_at && (
            <p className="text-gray-500 text-xs">
              종료시각: {HHMMSS(activity.stopped_at)}
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-end gap-x-2">
          {activity.status === "playing" ? (
            <StopButton activity={activity} />
          ) : (
            <PlayButton activity={activity} />
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

const HHMMSS = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 9);

  return date.toISOString().substring(11, 19);
};
