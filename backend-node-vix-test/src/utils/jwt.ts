import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET as string;

export interface IPayload {
  idUser: string;
  role: string;
  idBrandMaster: number | null;
}

export const genToken = (payload: IPayload) => {
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): IPayload => {
  try {
    return jwt.verify(token, secret) as IPayload;
  } catch (error) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
