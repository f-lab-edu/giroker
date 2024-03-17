import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { Adapter } from "next-auth/adapters";

import { DB, GOOGLE, IS_API_MOCKING } from "~/constants/env";
import { redirect } from "next/navigation";
import { SIGNIN } from "~/constants/route";

const pool = new Pool({
  host: DB.HOST,
  database: DB.DATABASE,
  user: DB.USER,
  password: DB.PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  ssl: true,
});

export const config = {
  // @FIXME: https://github.com/nextauthjs/next-auth/issues/9493
  adapter: PostgresAdapter(pool) as Adapter,
  providers: [
    GoogleProvider({
      clientId: GOOGLE.ID,
      clientSecret: GOOGLE.SECRET,
      profile: (profile) => {
        // @MEMO: id will be genereated by db serial, not using real sub.
        // reture id for avoid error in next-auth
        return { ...profile, id: profile?.sub, image: profile?.picture };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (!token?.sub) {
        throw new Error("user token not have sub");
      }

      session.user.id = token.sub;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getServerSession(...args, config);

  if (IS_API_MOCKING) {
    return {
      user: {
        name: "Byonghun Lee",
        email: "dlqud19@gmail.com",
        image:
          "https://lh3.googleusercontent.com/a/ACg8ocK2wO1MZUvKiFPQFO_f99Ryekp_w4I1BPqO8Ardj8Fl=s96-c",
        id: "3",
      },
    };
  }

  if (!session) {
    redirect(SIGNIN);
  }

  return session;
}
