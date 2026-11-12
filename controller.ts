import argon2 from "argon2";
import { SignJWT } from "jose";
import {
  loginCredentialSchema,
  loginCredentialType,
} from "@task-manager/shared";
import { getUserByEmail } from "./drizzle/DBcontrollers";
import { User } from "./schema";

export async function LoginReqValidate(req: any, res: any, next: any) {
  try {
    const result = loginCredentialSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    req.body = result.data;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
}
export async function authenticateUser(
  req: loginCredentialType,
): Promise<boolean> {
  try {
    const { email, password } = req;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return true;
  } catch (error) {
    throw new Error("Error authenticating user");
  }
}
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

export async function verifyPassword(
  hashedPassword: string,
  plainPassword: string,
): Promise<boolean> {
  try {
    const isMatch = await argon2.verify(hashedPassword, plainPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error verifying password");
  }
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateJWT(user: User): Promise<string> {
  try {
    const jwt = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(user.id))
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET);
    return jwt;
  } catch (error) {
    throw new Error("Error generating JWT");
  }
}

export async function verifyJWT(token: string): Promise<any> {
  try {
    const { payload } = await new VerifierJWT(token)
      .setProtectedHeader({ alg: "HS256" })
      .verify(JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error("Error verifying JWT");
  }
}