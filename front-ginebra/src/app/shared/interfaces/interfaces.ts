export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  creationDate: Date;
}

export interface IUserResponse {
  ok: true;
  message: string;
  token: string;
  user: IUser;
}

export interface IErrorResposne {
  ok: false;
  message: string;
}

export type IAuthResponse = IUserResponse | IErrorResposne;
