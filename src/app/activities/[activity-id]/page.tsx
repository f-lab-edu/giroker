import BasicLayout from "~/components/ui/BasicLayout";
import { Textarea } from "~/components/ui/textarea";
import { getActivity } from "~/models/activity";
import Timer from "./features/Timer";

export default async function ActivitiesStartPage({
  params,
}: {
  params: { "activity-id": string };
}) {
  const activityId = params["activity-id"];
  return (
    <BasicLayout>
      <div className="flex flex-col items-center w-full gap-y-4">
        <Timer />
        <Editor activityId={activityId} />
      </div>
    </BasicLayout>
  );
}

async function Editor({ activityId }: { activityId: string }) {
  if (!activityId) {
    return "존재하지 않는 활동이에요!";
  }

  const activity = await getActivity({ activityId });

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
