import * as dayjs from 'dayjs';
dayjs().format();
export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  creationDate: Date;
  fullName: string;
  imgUrl?: string;
}

export interface IUserResponse {
  ok: true;
  message: string;
  token: string;
  user: IUser;
}

export interface ISingleUserSuccessResponse {
  ok: true;
  message: string;
  user: IUser;
}

export interface IDeleteResponse {
  ok: true;
  message: string;
}

export interface ISuccessfulUpdateUserResponse {
  ok: true;
  message: string;
  updatedUser: IUser;
}
export interface IErrorResponse {
  ok: false;
  message: string;
}

export type IAuthResponse = IUserResponse | IErrorResponse;
export type IGetSingleUserResponse =
  | ISingleUserSuccessResponse
  | IErrorResponse;

export interface IUsersResponse {
  ok: true;
  message: string;
  users: IUser[];
}

export type IGetUsersResponse = IUsersResponse | IErrorResponse;
export type IDeleteUserResponse = IDeleteResponse | IErrorResponse;
export type IUpdateUserResponse =
  | ISuccessfulUpdateUserResponse
  | IErrorResponse;

// PETS

export interface ILinkedUserElement {
  _id: string;
  username: string;
  email: string;
  imgUrl: string;
}
export type ILinkedUser = {
  linkedUser: ILinkedUserElement;
  viewAuthorization: boolean;
  editAuthorization: boolean;
  creator: boolean;
};

export interface IPetBath {
  _id?: string;
  date: Date;
  bather?: string;
  shampoo?: string;
  bathType?: String;
}
export interface IPet {
  _id: string;
  petName: string;
  bathPeriodicity: number;
  isPublic: boolean;
  imgUrl: string;
  creationDate: Date;
  shampoos: string[];
  bathTypes: string[];
  bathers: string[];
  linkedUsers: ILinkedUser[];
  registeredBaths: IPetBath[];
  viewAuthorization?: boolean;
  editAuthorization?: boolean;
  creator?: boolean;
}

export interface ILinkedPetsResponse {
  ok: true;
  message: string;
  pets: IPet[];
}

export interface IPetResponse {
  ok: true;
  message: string;
  pet: IPet;
}

export interface IMultiplePetsResponse {
  ok: true;
  message: string;
  pets: IPet[];
}

export type IgetLinkedPetsResponse = ILinkedPetsResponse | IErrorResponse;
export type IgetPetByIdResponse = IPetResponse | IErrorResponse;

export type IGetMultiplePetsResponse = IMultiplePetsResponse | IErrorResponse;

export interface ICounterBathInfo {
  hasRegisteredBaths: boolean;
  lastBathDate: null | Date;
  daysPassed: null | number;
  nextBathDate: null | Date;
  daysLeft: number;
}

export interface ISinglePetSuccessResponse {
  ok: true;
  message: string;
  pet: IPet;
}

export type ISinglePetResponse = ISinglePetSuccessResponse | IErrorResponse;

export type IDictionary = { [index: string]: string };
