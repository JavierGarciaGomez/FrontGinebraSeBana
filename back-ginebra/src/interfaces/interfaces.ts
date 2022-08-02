import { Request } from "express";
import { ObjectId } from "mongoose";
export interface IGetUserAuthRequest extends Request {
  userReq?: {
    uid: string;
    username: string;
    email: string;
    role: string;
  };
}
export interface IGetUserAuthInfoRequest extends Request {
  role?: string;
  uid?: string;
}

export interface IUserToken {
  uid: string;
  username: string;
  email: string;
  role: string;
}
