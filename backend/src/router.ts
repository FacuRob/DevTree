import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

/** Authenticacion y Registro */
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El Handle no puede ir vacio"),
  body("name").notEmpty().withMessage("El Nombre no puede ir vacio"),
  body("email")
    .isEmail() //valida el formato de un Email
    .withMessage("E-mail no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La Contraseña debe tener un Minimo de 8 Caracteres"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email")
    .isEmail() //valida el formato de un Email
    .withMessage("E-mail no válido"),
  body("password").notEmpty().withMessage("La Contraseña es obligatoria"),
  handleInputErrors,
  login
);

router.get("/user", authenticate, getUser);

export default router;
