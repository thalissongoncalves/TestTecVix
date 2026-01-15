import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { user } from "@prisma/client";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";

export class UserController {
  constructor() {}
  private userService = new UserService();

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createNewUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.createNewUser(
      req.body,
      user,
    );
    return res.status(STATUS_CODE.CREATED).json(result);
  }
}
