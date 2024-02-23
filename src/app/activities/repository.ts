import { sql } from "@vercel/postgres";
import { Activity } from "./model";
import { auth } from "~/lib/auth";

export type ActivityRepository = {
  findById({ activityId }: { activityId: Activity["id"] }): Promise<Activity>;
  findAll({
    order,
    date,
  }: {
    order: "asc" | "desc";
    date?: Date;
  }): Promise<Activity[]>;
  save({ activity }: { activity: Omit<Activity, "id"> }): Promise<void>;
  update({ activity }: { activity: Activity }): Promise<void>;
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

  async findAll({ order, date }) {
    const session = await auth();

    const dateToYYYY_MM_DD = (date: Date) =>
      date.toISOString().substring(0, 10);

    const today = date ? dateToYYYY_MM_DD(date) : undefined;

    let query = `SELECT * FROM activities WHERE "userId" = ${session.user.id}`;

    if (date) {
      // KR +9 tz
      query += `
            AND created_at >= DATE '${today} 15:00:00' 
            AND created_at < DATE '${today} 15:00:00' + INTERVAL '1 day'`;
    }

    query += ` ORDER BY Id ${order}`;

    const result = await sql.query(query);
    return result.rows as unknown as Activity[];
  },

  async save({ activity }: { activity: Omit<Activity, "id"> }) {
    const session = await auth();
    const now = Date.now() / 1000.0;

    await sql.query(`INSERT INTO activities ("userId", name, description, created_at)
                     VALUES ('${session.user.id}', '${activity.name} ', '${activity.description}', to_timestamp(${now}))`);
  },

  async update({ activity }: { activity: Activity }) {
    const session = await auth();

    await sql.query(`UPDATE activities
                     SET memo = '${activity.memo}' 
                     WHERE "userId" = ${session.user.id}
                            AND id = ${activity.id}`);
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
