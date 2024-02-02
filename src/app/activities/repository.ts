import { sql } from "@vercel/postgres";
import { Activity } from "./model";

export type ActivityRepository = {
  findById({ activityId }: { activityId: Activity["id"] }): Promise<Activity>;
  findAll({ order }: { order: "asc" | "desc" }): Promise<Activity[]>;
  save({ activity }: { activity: Omit<Activity, "id"> }): Promise<void>;
  start({
    activityId,
    startedAt,
  }: {
    activityId: Activity["id"];
    startedAt: Activity["started_at"];
  }): Promise<void>;
  stop({
    activityId,
    stoppedAt,
  }: {
    activityId: Activity["id"];
    stoppedAt: Activity["stopped_at"];
  }): Promise<void>;
};

export const repository: ActivityRepository = {
  async findById({ activityId }) {
    const result = await sql`SELECT * FROM activities where id = ${activityId}`;
    return result.rows[0] as unknown as Activity;
  },

  async findAll({ order }) {
    const result = await sql.query(
      `SELECT * FROM activities ORDER BY Id ${order}`,
    );

    return result.rows as unknown as Activity[];
  },

  async save({ activity }: { activity: Omit<Activity, "id"> }) {
    await sql.query(`INSERT INTO activities (name, description) 
                     VALUES ('${activity.name} ', '${activity.description}')`);
  },

  async start({ activityId, startedAt }) {
    await sql.query(`UPDATE activities
                     SET status = 'playing',
                         started_at = to_timestamp(${startedAt})
                     WHERE id = ${activityId}`);
  },

  async stop({ activityId, stoppedAt }) {
    await sql.query(`UPDATE activities
                     SET status = 'stopped',
                         stopped_at = to_timestamp(${stoppedAt})
                     WHERE id = ${activityId}`);
  },
};
