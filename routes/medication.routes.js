'use strict';

import express from "express";
import { MedicationController } from "../controllers/medication.controller.js";

const router = express.Router();

// CRUD completo
router.get("/", MedicationController.get_all);

router.get("/:username", MedicationController.get_by_user);

router.get("/:id/:username", MedicationController.get_by_id_user);

router.post("/", MedicationController.create);

router.put("/", MedicationController.update);

router.delete("/:id/:username", MedicationController.remove);

export default router;