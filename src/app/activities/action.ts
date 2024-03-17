"use server";

import { revalidatePath } from "next/cache";
import {
  Activity,
  createActivity,
  updateActivity,
  startActivity,
  stopActivity,
} from "./model";
import { repository } from "./repository";

export async function createActivityAction(activity: Activity) {
  await createActivity({ activity, repository });

  revalidatePath("/");
}

export async function updateActivityAction({
  activity,
}: {
  activity: Activity;
}) {
  await updateActivity({ activity, repository });
}

export async function startActivityAction({
  activityId,
}: {
  activityId: Activity["id"];
}) {
  await startActivity({
    activityId,
    repository,
  });

  revalidatePath("/");
}

export async function stopActivityAction({
  activityId,
}: {
  activityId: Activity["id"];
}) {
  await stopActivity({
    activityId,
    repository,
  });

  revalidatePath("/");
}
