import { createContext } from "react";

export type userT = {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  userId: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const UserContext = createContext<userT | null>(null);
const SetUserContext = createContext<React.Dispatch<
  React.SetStateAction<userT | null>
> | null>(null);

export { UserContext, SetUserContext };
