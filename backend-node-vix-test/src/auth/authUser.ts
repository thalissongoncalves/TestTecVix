import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";

interface JwtPayload {
  id: string;
  role: string;
  idBrandMaster: string;
}

export const authUser = (
  req: CustomRequest<JwtPayload>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  const [, token] = authorization.split(" ");

  const payload = verifyToken(token) as JwtPayload;

  if (!payload || !payload.id) {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }
  
  req.user = payload;
  return next();
};
