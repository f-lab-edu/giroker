import AddButton from "~/app/activities/features/AddButton";
import AcgivityList from "./activities/widgets/ActivityList";

export default async function HomePage() {
  return (
    <main className="flex max-w-96 m-auto min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center w-full gap-y-4">
        00:00:00
        <hr className="text-gray-500 w-full" />
        <AddButton />
        <AcgivityList />
      </div>
    </main>
  );
}
