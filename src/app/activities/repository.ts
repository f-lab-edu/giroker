import { sql } from "@vercel/postgres";
import { Activity } from "./model";
import { auth } from "~/lib/auth";

export type ActivityRepository = {
  findById({ activityId }: { activityId: Activity["id"] }): Promise<Activity>;
  findAll({ order }: { order: "asc" | "desc" }): Promise<Activity[]>;
  save({ activity }: { activity: Omit<Activity, "id"> }): Promise<void>;
  start({
    activityId,
    startedAt,
  }: {
    activityId: Activity["id"];
    startedAt: number;
  }): Promise<void>;
  stop({
    activityId,
    stoppedAt,
  }: {
    activityId: Activity["id"];
    stoppedAt: number;
  }): Promise<void>;
};

export const repository: ActivityRepository = {
  async findById({ activityId }) {
    const session = await auth();

    const result =
      await sql`SELECT * FROM activities WHERE "userId" = ${session.user.id} AND id = ${activityId}`;
    return result.rows[0] as unknown as Activity;
  },

  async findAll({ order }) {
    const session = await auth();

    const result = await sql.query(
      `SELECT * FROM activities WHERE "userId" = ${session.user.id} ORDER BY Id ${order}`,
    );

    return result.rows as unknown as Activity[];
  },

  async save({ activity }: { activity: Omit<Activity, "id"> }) {
    const session = await auth();

    await sql.query(`INSERT INTO activities ("userId", name, description)
                     VALUES ('${session.user.id}', '${activity.name} ', '${activity.description}')`);
  },

  async start({ activityId, startedAt }) {
    const session = await auth();

    await sql.query(`UPDATE activities
                     SET status = 'playing',
                         started_at = to_timestamp(${startedAt})
                     WHERE "userId" = ${session.user.id}
                           AND id = ${activityId}`);
  },

  async stop({ activityId, stoppedAt }) {
    const session = await auth();

    await sql.query(`UPDATE activities
                     SET status = 'stopped',
                         stopped_at = to_timestamp(${stoppedAt})
                     WHERE "userId" = ${session.user.id}
                           AND id = ${activityId}`);
  },
};
