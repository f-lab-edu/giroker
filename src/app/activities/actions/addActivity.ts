"use server";

import { revalidatePath } from "next/cache";
import { Activity, createActivity } from "../model";
import { repository } from "../repository";

export async function addActivity(formData: FormData) {
  const data = Object.fromEntries(formData.entries()) as unknown as Omit<
    Activity,
    "id"
  >;

  await createActivity({ activity: data, repository });
  revalidatePath("/");
}
