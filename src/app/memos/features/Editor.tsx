"use client";

import { Activity } from "~/app/activities/model";
import { Textarea } from "~/components/ui/textarea";
import { updateActivityAction } from "~/app/activities/action";
import { useDebounce } from "~/hooks/useDebounce";

export default function Editor({ activity }: { activity: Activity }) {
  const onKeyUpTextArea = useDebounce(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const memo = target.value;

      updateActivityAction({
        activity: { ...activity, memo },
      });
    },
    1000,
  );

  return (
    <section className="w-full">
      <div className="pb-4">
        <h1 className="font-bold">{activity.name}</h1>
        <p className="text-sm text-gray-500">{activity.description}</p>
      </div>
      <Textarea
        defaultValue={activity.memo}
        onKeyUp={onKeyUpTextArea}
        autoFocus
        className="h-[70vh]"
      />
    </section>
  );
}
