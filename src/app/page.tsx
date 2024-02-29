import BasicLayout from "~/components/ui/BasicLayout";
import { getActivities } from "./activities/model";
import { repository } from "./activities/repository";
import ActivityListPanel from "./activities/widgets/ActivityListPanel";

export const dynamic = "force-dynamic";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const date = parseParam({ searchParams });
  const activities = await getActivities({ date, repository });

  return (
    <BasicLayout>
      <ActivityListPanel date={date} activities={activities} />
    </BasicLayout>
  );
}

function parseParam({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Date {
  const date = searchParams?.date;

  if (Array.isArray(date)) {
    return new Date(date[0]);
  }

  if (date) {
    return new Date(date);
  }

  return new Date();
}
