import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { UserController } from "../controllers/UserController";
import { authUser } from "../auth/authUser";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";
import { isAdmin } from "../auth/isAdmin";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/users

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.get(
  `${BASE_PATH}`,
  authUser,
  async (req, res) => {
    await userController.listAll(req, res);
  },
);

userRoutes.get(
  `${BASE_PATH}/:id`,
  authUser,
  async (req, res) => {
    await userController.getUserById(req, res);
  },
);

userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res) => {
    await userController.updateUser(req, res);
  },
);

userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  isAdmin,
  async (req, res) => {
    await userController.deleteUser(req, res);
  },
);

export { userRoutes };
