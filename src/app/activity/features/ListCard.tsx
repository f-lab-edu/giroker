import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PlayButton from "./PlayButton";
import type { Activity } from "~/models/activity";

export default function ListCard({ activity }: { activity: Activity }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <CardDescription>{activity.description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="justify-end">
        <PlayButton />
      </CardFooter>
    </Card>
  );
}
