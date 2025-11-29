'use strict';

import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", UserController.get_all);
router.get("/:id", UserController.get_by_id);
router.post("/", UserController.create);
router.put("/", UserController.update);
router.delete("/:id", UserController.remove);
router.get("/username/:username", UserController.get_by_username);
router.post("/login", UserController.login);

export default router;