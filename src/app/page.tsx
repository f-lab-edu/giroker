import AddButton from "~/app/activities/features/AddButton";
import AcgivityList from "./activities/widgets/ActivityList";
import BasicLayout from "~/components/ui/BasicLayout";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { SIGNIN } from "~/constants/route";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect(SIGNIN);
  }

  return (
    <BasicLayout>
      <div className="flex flex-col items-center w-full gap-y-4">
        00:00:00
        <hr className="text-gray-500 w-full" />
        <AddButton />
        <AcgivityList />
      </div>
    </BasicLayout>
  );
}
