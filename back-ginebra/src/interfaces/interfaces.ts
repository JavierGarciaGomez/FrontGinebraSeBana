import { Request } from "express";
import { ObjectId, Types } from "mongoose";

export interface ILinkedPet {
  linkedPet: Types.ObjectId;
  viewAuthorization: boolean;
  editAuthorization: boolean;
  creator: boolean;
}
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  fullName?: string;
  linkedPets?: ILinkedPet[];
  //   comparePassword: (password: string) => Promise<Boolean>;
}
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

// PETS

export interface ILinkedUser {
  linkedUser: Types.ObjectId;
  viewAuthorization: boolean;
  editAuthorization: boolean;
  creator: boolean;
}

export interface IPetBath {
  date: Date;
  bather?: { username: string; imgUrl: string };
  shampoos?: string[];
  bathTypes: String;
}

export interface IPet {
  petName: string;
  bathPeriodicity: number;
  isPublic: boolean;
  shampoos: string[];
  bathTypes: string[];
  linkedUsers: ILinkedUser[];
  registeredBaths: IPetBath[];
}
