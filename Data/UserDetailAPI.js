// Default admin account of the local demo app; override with ADMIN_PASSWORD in .env
export const adminDetails = {
  username: "admin",
  password: process.env.ADMIN_PASSWORD || "Admin123",
};
