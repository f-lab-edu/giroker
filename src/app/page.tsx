import AddButton from "~/app/activity/features/AddButton";
import AcgivityList from "./activity/widgets/ActivityList";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getActivities } from "~/models/activity";
import { keys } from "~/models/quries";
export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: keys.activities.list(),
    queryFn: getActivities,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex max-w-96 m-auto min-h-screen flex-col items-center justify-between p-8">
        <div className="flex flex-col items-center w-full gap-y-4">
          00:00:00
          <hr className="text-gray-500 w-full" />
          <AddButton />
          <AcgivityList />
        </div>
      </main>
    </HydrationBoundary>
  );
}
