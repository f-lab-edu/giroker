"use server";

import { revalidatePath } from "next/cache";
import { Activity, createActivity } from "~/models/activity";

export async function addActivity(formData: FormData) {
  const data = Object.fromEntries(formData.entries()) as Omit<Activity, "id">;

  await createActivity({ body: data });
  revalidatePath("/");
}
