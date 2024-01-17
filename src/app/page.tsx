import AddActivityButton from "~/features/add-activity/AddActivityButton";

export default function Home() {
  return (
    <main className="flex max-w-96 m-auto min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center w-full gap-y-2">
        00:00:00
        <hr className="text-gray-500 w-full" />
        <AddActivityButton />
      </div>
    </main>
  );
}
