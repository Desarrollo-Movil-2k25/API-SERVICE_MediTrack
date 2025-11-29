'use strict';

import { readJSON, writeJSON } from "../util/fileHandler.js";
import { HTTP_STATUS } from "../util/httpResponse.js";
const jsonFile = "./data/users.json";

let userList = readJSON(jsonFile);

export const UserModel = {

    getAll() {
        return {
            data: userList,
            responseCode: HTTP_STATUS.OK,
            message: "Action executed successfully."
        };
    },  

    getById(id) {
        try {
            const result = userList.filter(u => u.id.trim() === id.trim());
            return {
                data: result.length ? result[0] : null,
                responseCode: result.length ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
                message: result.length ? "Action executed successfully." : "User not found."
            };
        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.SERVER_ERROR,
                message: error.message
            };
        }
    },

    getByUserName(username) {
        try {
            const user = userList.find(
                u => u.nameUser.trim() === username.trim()
            );

            return {
                data: user || null,
                responseCode: user ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
                message: user ? "Action executed successfully." : "User not found."
            };
        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.SERVER_ERROR,
                message: error.message
            };
        }
    },

    add(user) {
        let data = null;

        try {
            if (!user || JSON.stringify(user) === "{}") {
                return {
                    data,
                    responseCode: HTTP_STATUS.BAD_REQUEST,
                    message: "Action was not executed, the endpoint needs a JSON in the body."
                };
            }
            
            const existing = this.getById(user.id);
            if (existing.data !== null) {
                return {
                    data,
                    responseCode: HTTP_STATUS.BAD_REQUEST,
                    message: "Duplicate data is not allowed. The user is already stored with that ID. Please try inserting another one."
                };
            }

            const existing2 = this.getByUserName(user.nameUser);
            if (existing2.data !== null) {
                return {
                    data,
                    responseCode: HTTP_STATUS.BAD_REQUEST,
                    message: "Duplicate data is not allowed. The user is already stored with that username. Please try another one."
                };
            }

            userList.push(user);
            writeJSON(jsonFile, userList);
            return {
                data: user,
                responseCode: HTTP_STATUS.OK,
                message: "The user was inserted successfully."
            };


        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: error.message
            };
        }
    },


    remove(id) {

        if (!id || id.trim() === "") {
            return {
                data: null,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: "Deletion was not executed. It requires the user id."
            };
        }

        const record = this.getById(id);

        // No existe
        if (record.data === null) {
            return {
                data: null,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: "The information was not found to be removed."
            };
        }

        // Existe - eliminar
        userList = userList.filter(u => u.id.trim() !== id.trim());

        writeJSON(jsonFile, userList);

        return {
            data: record.data,
            responseCode: HTTP_STATUS.OK,
            message: "Information was removed properly."
        };
    },

    update(user) {
        let data = null;

        if (!user || JSON.stringify(user) === "{}") {
            return {
                data,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: "Action was not executed, the endpoint needs a JSON in the body."
            };
        }

        const record = this.getById(user.id);
        if (record.data === null) {
            return {
                data,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: "The information was not found to be updated."
            };
        }

        // Eliminar primero
        userList = userList.filter(u => u.id.trim() !== user.id.trim());

        // Insertar actualizado
        userList.push(user);
        writeJSON(jsonFile, userList);

        return {
            data: user,
            responseCode: HTTP_STATUS.OK,
            message: "User updated successfully."
        };
    },

    login(username, password) {
        try {
            const user = userList.find(
                u => u.nameUser.trim() === username.trim()
            );

            if (!user) {
                return {
                    data: null,
                    responseCode: HTTP_STATUS.UNAUTHORIZED,
                    message: "User not found"
                };
            }

            if (user.password !== password) {
                return {
                    data: null,
                    responseCode: HTTP_STATUS.UNAUTHORIZED,
                    message: "Incorrect password"
                };
            }

            return {
                data: user,
                responseCode: HTTP_STATUS.OK,
                message: "Login successful"
            };

        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.SERVER_ERROR,
                message: error.message
            };
        }
    }

};