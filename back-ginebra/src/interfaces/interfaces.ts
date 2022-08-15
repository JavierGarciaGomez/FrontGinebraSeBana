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
  creationDate: Date;
  imgUrl: string;
  //   comparePassword: (password: string) => Promise<Boolean>;
}
export interface IGetUserAuthRequest extends Request {
  userReq?: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}
export interface IGetUserAuthInfoRequest extends Request {
  role?: string;
  _id?: string;
}

export interface IUserToken {
  _id: string;
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
  bather?: string;
  shampoo?: string;
  bathType?: String;
}

export interface IPet {
  petName: string;
  bathPeriodicity: number;
  isPublic: boolean;
  imgUrl: string;
  creationDate: Date;
  shampoos: string[];
  bathers: string[];
  bathTypes: string[];
  linkedUsers: ILinkedUser[];
  registeredBaths: IPetBath[];
}
