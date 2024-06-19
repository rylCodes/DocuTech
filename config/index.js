const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://ryltechdocs.test"
  : "http://somewebsitedomain.com";
