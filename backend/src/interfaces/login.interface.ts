import { User } from "./user.interface";

export interface Login {
  _id?: string;
  user: User;
  timeStamp: Date;
  origin: string;
}
