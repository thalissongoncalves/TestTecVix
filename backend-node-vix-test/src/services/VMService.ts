import { ETaskLocation, EVMStatus, user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";
import bcrypt from "bcrypt";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);
    return this.vMModel.listAll({
      query: validQuery,
    });
  }

  async createNewVM(data: unknown, user: user) {
    const validateData = vMCreatedSchema.parse(data);
    const SALT_ROUNDS = 10;

    if (!user.idBrandMaster) {
      throw new AppError("Forbidden", 403);
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(validateData.pass, SALT_ROUNDS);

    // Cria um novo objeto com a senha hasheada
    const vmData = {
      ...validateData,
      pass: hashedPassword,
    };

    return this.vMModel.createNewVM({
      ...vmData,
      status: EVMStatus.STOPPED,
      idBrandMaster: user.idBrandMaster,
    });
  }

  async updateVM(idVM: number, data: unknown, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.vMModel.updateVM(idVM, validateDataSchema);
    return updatedVM;
  }

  async deleteVM(idVM: number, user: user) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }

  async startVM(idVM: number) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (oldVM.status === "RUNNING") {
      throw new AppError("VM is already running", STATUS_CODE.BAD_REQUEST);
    }
    const startVm = await this.vMModel.startVM(idVM);
    return startVm;
  }

  async pauseVM(idVM: number) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (oldVM.status === "PAUSED") {
      throw new AppError("VM is already paused", STATUS_CODE.BAD_REQUEST);
    }
    const pauseVM = await this.vMModel.pauseVM(idVM);
    return pauseVM;
  }
}
