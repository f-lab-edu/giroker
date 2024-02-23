export function getBaseURL() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const IS_API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === "enable";
const API_ENDPOINT = IS_API_MOCKING
  ? "http://localhost:9090"
  : process.env.NEXT_PUBLIC_API_ENDPOINT;

const GOOGLE = {
  ID: process.env.GOOGLE_ID ?? "",
  SECRET: process.env.GOOGLE_SECRET ?? "",
};

const DB = {
  HOST: process.env.POSTGRES_HOST,
  DATABASE: process.env.POSTGRES_DATABASE,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
};

export { IS_API_MOCKING, API_ENDPOINT, GOOGLE, DB };
