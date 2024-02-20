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

export default function ListCard({ activity }: { activity: Activity }) {
  return (
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
            시작시각:
            {activity.started_at.toLocaleTimeString()}
          </p>
        )}
        {activity.stopped_at && (
          <p className="text-gray-500 text-xs">
            종료시각:
            {activity.stopped_at.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <PlayButton activity={activity} />
      </CardFooter>
    </Card>
  );
}
