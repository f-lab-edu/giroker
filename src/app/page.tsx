import AddButton from "~/app/activities/features/AddButton";
import AcgivityList from "./activities/widgets/ActivityList";
import BasicLayout from "~/components/ui/BasicLayout";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { SIGNIN } from "~/constants/route";
import { getActivities } from "./activities/model";
import { repository } from "./activities/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect(SIGNIN);
  }

  const activities = await getActivities({ repository });

  return (
    <BasicLayout>
      <div className="flex flex-col items-center w-full gap-y-4">
        <div>
          <p className="text-gray-500 text-sm text-center">총 작업한 시간</p>
          <p className="text-2xl">
            {secondsToHHMMSS(
              activities.reduce((time, activity) => {
                if (activity.stopped_at && activity.status === "stopped") {
                  return (
                    activity.stopped_at.getTime() -
                    activity.started_at.getTime()
                  );
                }

                return time;
              }, 0),
            )}
          </p>
        </div>
        <hr className="text-gray-500 w-full" />
        <AddButton />
        <AcgivityList activities={activities} />
      </div>
    </BasicLayout>
  );
}

const secondsToHHMMSS = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
};
