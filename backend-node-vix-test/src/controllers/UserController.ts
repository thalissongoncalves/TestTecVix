import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";
import { user } from "@prisma/client";

export class UserController {
  private userService = new UserService();

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getUserById(req: CustomRequest<unknown>, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Invalid user id" });
    }

    const result = await this.userService.getUserById(id);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;

    if (typeof idUser !== "string") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Invalid user id" });
    }
    
    const result = await this.userService.updateUser(idUser, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;

    if (typeof idUser !== "string") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Invalid user id" });
    }

    const result = await this.userService.deleteUser(idUser);
    return res.status(STATUS_CODE.NO_CONTENT).json(result);
  }
}
