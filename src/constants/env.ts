const IS_API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === "enable";
const API_ENDPOINT = IS_API_MOCKING
  ? "http://localhost:9090"
  : process.env.NEXT_PUBLIC_API_ENDPOINT;

export { IS_API_MOCKING, API_ENDPOINT };
