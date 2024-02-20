import BasicLayout from "~/components/ui/BasicLayout";
import { Textarea } from "~/components/ui/textarea";
import { Activity, getActivity } from "../model";
import Timer from "./features/Timer";
import { repository } from "../repository";

export default async function ActivitiesStartPage({
  params,
}: {
  params: { "activity-id": string };
}) {
  const activityId = params["activity-id"];

  const activity = await getActivity({ repository, activityId });

  return (
    <BasicLayout>
      <div className="flex flex-col items-center w-full gap-y-4">
        <Timer activity={activity} />
        <Editor activity={activity} />
      </div>
    </BasicLayout>
  );
}

async function Editor({ activity }: { activity: Activity }) {
  if (!activity) {
    return "존재하지 않는 작업이에요!";
  }

  return (
    <section className="w-full">
      <div className="pb-4">
        <h1 className="font-bold">{activity.name}</h1>
        <p className="text-sm text-gray-500">{activity.description}</p>
      </div>
      <Textarea autoFocus className="h-[70vh]" />
    </section>
  );
}
