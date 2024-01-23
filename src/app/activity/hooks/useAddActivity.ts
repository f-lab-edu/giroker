"use client";

import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createActivity } from "~/models/activity";
import { keys } from "~/models/quries";

type Schema = z.infer<typeof schema>;

export default function useAddActivity() {
  const queryClient = useQueryClient();

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "1자 이상으로 설정해주세요" })
      .max(30, { message: "30자 이하로 설정해주세요" }),
    description: z.string().max(80, { message: "80자 이하로 설정해주세요" }),
  });

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<Schema>) {
    await createActivity({ body: values });

    await queryClient.invalidateQueries({ queryKey: keys.activities.list() });

    form.reset({ name: "", description: "" });
  }

  return { form, onSubmit };
}
