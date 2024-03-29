import { z } from "zod";
import { ActivityRepository } from "./repository";

type Status = "idle" | "playing" | "stopped";

type Activity = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  memo?: string;
  created_at: string;
  started_at?: string;
  stopped_at?: string;
  status: Status;
};

type ActivitySchema = z.infer<typeof activitySchema>;

const activitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "1자 이상으로 설정해주세요" })
    .max(100, { message: "100자 이하로 설정해주세요" }),
  description: z.string().max(300, { message: "300자 이하로 설정해주세요" }),
});

const ACTIVITES = "activities";

async function getActivity({
  activityId,
  repository,
}: {
  activityId: Activity["id"];
  repository: ActivityRepository;
}) {
  const result = await repository.findById({ activityId });

  return result;
}

async function getActivities({
  order = "desc",
  date,
  repository,
}: {
  order?: "asc" | "desc";
  date?: Date;
  repository: ActivityRepository;
}) {
  // converted to YYYY-MM-DD
  const YYYYMMDD = (date: Date) => date.toISOString().substring(0, 10);

  const KRTZ = 9 * 60 * 60 * 1000;

  const dateTime = date
    ? new Date(date.getTime() + KRTZ)
    : new Date(Date.now() + KRTZ);
  const targetDate = new Date(
    new Date(dateTime).setDate(dateTime.getDate() - 1),
  );

  // ex) today === '2024-03-01', target = today - 1 day => '2024-02-29'
  // query => '2024-02-29 15:00:00' ~ '2024-03-01 15:00:00'
  const today = YYYYMMDD(targetDate);

  const result = await repository.findAll({ order, date: today });

  return result;
}

async function createActivity({
  activity,
  repository,
}: {
  activity: Omit<Activity, "id">;
  repository: ActivityRepository;
}) {
  await repository.save({ activity });
}

export async function updateActivity({
  activity,
  repository,
}: {
  activity: Activity;
  repository: ActivityRepository;
}) {
  await repository.update({ activity });
}

async function startActivity({
  activityId,
  repository,
}: {
  activityId: Activity["id"];
  repository: ActivityRepository;
}) {
  await repository.start({
    activityId,
    startedAt: Date.now() / 1000.0,
  });
}

async function stopActivity({
  activityId,
  repository,
}: {
  activityId: Activity["id"];
  repository: ActivityRepository;
}) {
  await repository.stop({ activityId, stoppedAt: Date.now() / 1000.0 });
}

export {
  type Activity,
  type ActivitySchema,
  activitySchema,
  ACTIVITES,
  getActivity,
  getActivities,
  createActivity,
  startActivity,
  stopActivity,
};
