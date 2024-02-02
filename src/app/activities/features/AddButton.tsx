"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ActivitySchema, activitySchema } from "../model";

import { addActivity } from "../actions/addActivity";

export default function ActivityAddButton() {
  const form = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <AddIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            action={async (formData) => {
              await addActivity(formData);
              form.reset({ name: "", description: "" });
            }}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름 *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <PopoverClose asChild>
                <Button type="submit">추가</Button>
              </PopoverClose>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
