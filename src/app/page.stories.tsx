import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import MainPage from "~/app/page";

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

export const Normal: Story = {
  args: { searchParams: { date: "2024-03-01" } },
  parameters: {
    moduleMock: {
      mock: () => {
        const authMock = createMock(auth, "auth");
        const mock = createMock(model, "getActivities");

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

        mock.mockReturnValue(Promise.resolve(activities));

        const user = {
          user: {
            id: "1",
          },
          expires: new Date().toISOString(),
        };

        authMock.mockReturnValue(Promise.resolve(user));

        return mock;
      },
    },
  },
};
