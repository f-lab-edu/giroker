"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  ActivitySchema,
  activitySchema,
  createActivity,
} from "~/models/activity";
import { keys } from "~/models/quries";

export default function useAddActivity() {
  const queryClient = useQueryClient();

  const form = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ActivitySchema) {
    await createActivity({ body: values });

    await queryClient.invalidateQueries({ queryKey: keys.activities.list() });

    form.reset({ name: "", description: "" });
  }

  return { form, onSubmit };
}
