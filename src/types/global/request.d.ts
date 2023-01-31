import { Request } from "express";
import { Keystore } from "model/keystore";
import { User } from "model/user";

export default interface Tokens {
  access: string;
  refresh: string;
}

declare interface PublicRequest extends Request {
  apiKey: any;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}
declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}
