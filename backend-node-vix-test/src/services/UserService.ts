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
import { genToken } from "../utils/jwt";
import { userUpdatedSchema } from "../types/validations/User/updateUser";
import { ERROR_MESSAGE } from "../constants/erroMessages";

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

  async updateUser(idUser: string, data: unknown) {
    const validateDataSchema = userUpdatedSchema.parse(data);
    const oldUser = await this.getUserById(idUser);

    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedUser = await this.userModel.updateUser(idUser, validateDataSchema);
    return updatedUser;
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", STATUS_CODE.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({
      idUser: user.idUser,
      role: user.role,
      idBrandMaster: user.idBrandMaster,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }
}
