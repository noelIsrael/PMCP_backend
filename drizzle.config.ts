import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});

// this file is a like a map to drizzle because in here we write paths where our schemas are where to put the generated sql files and the database credentials so drizzle can connect to the database and generate the sql files for us