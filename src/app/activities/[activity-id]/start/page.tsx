import BasicLayout from "~/components/ui/BasicLayout";
import { Textarea } from "~/components/ui/textarea";
import { getActivity } from "~/models/activity";

export default function ActivitiesStartPage({
  params,
}: {
  params: { "activity-id": string };
}) {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center w-full gap-y-4">
        <Timer />
        <Editor activityId={params["activity-id"]} />
      </div>
    </BasicLayout>
  );
}

function Timer() {
  return (
    <>
      00:00:00
      <hr className="text-gray-500 w-full" />
    </>
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
      <Textarea autoFocus className="h-[80vh]" />
    </section>
  );
}
