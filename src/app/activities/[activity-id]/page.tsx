import BasicLayout from "~/components/ui/BasicLayout";
import Editor from "~/app/memos/features/Editor";
import { getActivity } from "../model";
import Timer from "./features/Timer";
import { repository } from "../repository";

export default async function ActivitiesStartPage({
  params,
}: {
  params: { "activity-id": string };
}) {
  const activityId = params["activity-id"];

  const activity = await getActivity({ repository, activityId });

  if (!activity) {
    return;
  }

  return (
    <BasicLayout>
      {!activity ? (
        "존재하지 않는 작업이에요!"
      ) : (
        <div className="flex flex-col items-center w-full gap-y-4">
          <Timer activity={activity} />
          <Editor activity={activity} />
        </div>
      )}
    </BasicLayout>
  );
}
