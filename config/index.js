const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://127.0.0.1:8000"
  : "http://somewebsitedomain.com";

// export const server = dev
//   ? "http://docutech-backend.test"
//   : "http://somewebsitedomain.com";
