import BasicLayout from "~/components/ui/BasicLayout";
import { getActivities } from "./activities/model";
import { repository } from "./activities/repository";
import ActivityListPanel from "./activities/widgets/ActivityListPanel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const activities = await getActivities({ date: new Date(), repository });

  return (
    <BasicLayout>
      <ActivityListPanel activities={activities} />
    </BasicLayout>
  );
}
