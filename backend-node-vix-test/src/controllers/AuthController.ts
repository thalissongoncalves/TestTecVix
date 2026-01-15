import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";

export class AuthController {
  private userService = new UserService();

  async login(req: CustomRequest<unknown>, res: Response) {
    const { email, password } = req.body;

    const result = await this.userService.login(email, password);
    
    return res.status(STATUS_CODE.OK).json(result);
  }
}
