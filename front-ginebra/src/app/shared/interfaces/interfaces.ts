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

export interface ILinkedUser {
  linkedUser: string;
  viewAuthorization: boolean;
  editAuthorization: boolean;
  creator: boolean;
}

export interface IPetBath {
  date: Date;
  bather?: { username: string; imgUrl: string };
  shampoos?: string[];
  bathType: String;
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

export type getLinkedPetsResponse = ILinkedPetsResponse | IErrorResponse;
