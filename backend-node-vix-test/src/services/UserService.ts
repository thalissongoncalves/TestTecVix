import { querySchema } from "../types/validations/Queries/queryListAll";
import { UserModel } from "../models/UserModel";
import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import { user } from "@prisma/client";
import bcrypt from "bcrypt";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";

export class UserService {
  constructor() {}
  private userModel = new UserModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.userModel.listAll(validQuery);
  }

  async createNewUser(data: TUserCreated, user: user) {
    // Valida os dados
    const validData = userCreatedSchema.parse(data);

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(validData.password, 10);

    // Cria um novo objeto com a senha hasheada
    const userData = {
      ...validData,
      password: hashedPassword,
      isActive: true,
    };

    // Salva no banco
    const newUser = await this.userModel.createNewUser(userData);

    return newUser;
  }

  async getUserById(idUser: string) {
    const getUser = await this.userModel.getById(idUser);

    if (!getUser) {
      throw new AppError("User not found", STATUS_CODE.NOT_FOUND);
    }

    return getUser;
  }
}
