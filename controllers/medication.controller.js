'use strict';

import { MedicationModel } from "../models/medication.model.js";

export const MedicationController = {

    get_all(req, res) {
        res.json(MedicationModel.getAll());
    },

    get_by_id_user(req, res) {
        const { id, username } = req.params;
        res.json(MedicationModel.getByIdAndUser(id, username));
    },

    get_by_user(req, res) {
        const { username } = req.params;
        res.json(MedicationModel.getAllByUser(username));
    },

    create(req, res) {
        res.json(MedicationModel.add(req.body));
    },

    update(req, res) {
        res.json(MedicationModel.update(req.body));
    },

    remove(req, res) {
        const { id, username } = req.params;
        res.json(MedicationModel.remove(id, username));
    }
};
