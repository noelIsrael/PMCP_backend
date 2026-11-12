import { users } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
}
