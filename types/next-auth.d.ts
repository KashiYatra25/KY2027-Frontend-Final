import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type UserRole = "MANAGER" | "OPERATOR" | "MASTER_ADMIN" | "USER";
type AccountStatus = "ACTIVE" | "SUSPENDED";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: UserRole;
      accountStatus: AccountStatus;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role?: UserRole;
    accountStatus?: AccountStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    accessToken?: string;
    role?: UserRole;
    accountStatus?: AccountStatus;
  }
}
