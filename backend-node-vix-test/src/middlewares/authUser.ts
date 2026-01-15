import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export const authUser = (req: CustomRequest<unknown>, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      ERROR_MESSAGE.INVALID_TOKEN,
      STATUS_CODE.UNAUTHORIZED,
    );
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError(
      ERROR_MESSAGE.INVALID_TOKEN,
      STATUS_CODE.UNAUTHORIZED,
    );
  }

  const payload = verifyToken(token);

  req.user = payload;
  next();
};
