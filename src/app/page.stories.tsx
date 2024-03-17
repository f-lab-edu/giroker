import type { Meta, StoryObj } from "@storybook/react";
import MainPage from "~/app/page";

import { createMock } from "storybook-addon-module-mock";
import * as model from "~/app/activities/model";
import * as auth from "~/lib/auth";

const meta = {
  title: "MainPage",
  component: MainPage,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: { searchParams: { date: "2024-03-01" } },
  parameters: {
    moduleMock: {
      mock: () => {
        const activitiesMock = createMock(model, "getActivities");
        const authMock = createMock(auth, "auth");

        const activities: model.Activity[] = [
          {
            id: "1",
            userId: "1",
            name: "스토리북 설정하기",
            description: "추가 설정 정리",
            created_at: "2024-03-01",
            status: "idle",
          },
        ];

        activitiesMock.mockReturnValue(Promise.resolve(activities));

        const user = {
          user: {
            id: "1",
          },
          expires: new Date().toISOString(),
        };

        authMock.mockReturnValue(Promise.resolve(user));

        return [activitiesMock, authMock];
      },
    },
  },
};
