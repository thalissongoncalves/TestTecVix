import { querySchema } from "../types/validations/Queries/queryListAll";
import { UserModel } from "../models/UserModel";

export class UserService {
  constructor() {}
  private userModel = new UserModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.userModel.listAll(validQuery);
  }
}
