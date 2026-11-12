import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import postgres from "postgres";
import 'dotenv/config';
const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, {schema})

// so in here we initialize the connection to the database and export the db object so we can use it in other files