'use strict';

import { UserModel } from "../models/user.model.js";

export const UserController = {

    get_all(req, res) {
        res.json(UserModel.getAll());
    },

    get_by_id(req, res) {
        res.json(UserModel.getById(req.params.id));
    },

    create(req, res) {
        res.json(UserModel.add(req.body));
    },

    update(req, res) {
        res.json(UserModel.update(req.body));
    },

    remove(req, res) {
        res.json(UserModel.remove(req.params.id));
    },

    get_by_username(req, res) {
        res.json(UserModel.getByUserName(req.params.username));
    },

    login(req, res) {
        const { username, password } = req.body;
        res.json(UserModel.login(username, password));
    }
};
