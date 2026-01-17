import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { AuthController } from "../controllers/AuthController";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH; // /api/v1/auth

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await authController.login(req, res);
});

authRoutes.post(
  `${BASE_PATH}/register`,
  // authUser,
  // isManagerOrIsAdmin,
  async (req, res) => {
    await authController.createNewUser(req, res);
  },
);

export { authRoutes };