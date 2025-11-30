'use strict';

import { readJSON, writeJSON } from "../util/fileHandler.js";
import { HTTP_STATUS } from "../util/httpResponse.js";
const jsonFile = "./data/medication.json";

let medList = readJSON(jsonFile);

export const MedicationModel = {

    getAll() {
        return {
            data: medList,
            responseCode: HTTP_STATUS.OK,
            message: "Action executed successfully."
        };
    },

    getByIdAndUser(id, username) {
        try {
            const item = medList.find(
                m => m.id == id && m.ownerUser.trim() === username.trim()
            );

            return {
                data: item || null,
                responseCode: item ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND,
                message: item ? "Medication found." : "Medication not found."
            };

        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.SERVER_ERROR,
                message: error.message
            };
        }
    },

    getAllByUser(username) {
        const items = medList.filter(m => m.ownerUser.trim() === username.trim());

        return {
            data: items,
            responseCode: HTTP_STATUS.OK,
            message: "Action executed successfully."
        };
    },

    add(med) {
        let data = null;

        try {
            if (!med || JSON.stringify(med) === "{}") {
                return {
                    data,
                    responseCode: HTTP_STATUS.BAD_REQUEST,
                    message: "A JSON body is required."
                };
            }

            const existing = medList.find(
                m => m.id == med.id && m.ownerUser.trim() === med.ownerUser.trim()
            );

            if (existing) {
                return {
                    data,
                    responseCode: HTTP_STATUS.BAD_REQUEST,
                    message: "Medication already exists for this user."
                };
            }

            medList.push(med);
            writeJSON(jsonFile, medList);

            return {
                data: med,
                responseCode: HTTP_STATUS.CREATED,
                message: "Medication inserted successfully."
            };

        } catch (error) {
            return {
                data: null,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: error.message
            };
        }
    },

    update(med) {
        if (!med || JSON.stringify(med) === "{}") {
            return {
                data: null,
                responseCode: HTTP_STATUS.BAD_REQUEST,
                message: "JSON body required."
            };
        }

        const existing = medList.find(
            m => m.id == med.id && m.ownerUser.trim() === med.ownerUser.trim()
        );

        if (!existing) {
            return {
                data: null,
                responseCode: HTTP_STATUS.NOT_FOUND,
                message: "Medication not found."
            };
        }

        medList = medList.filter(
            m => !(m.id == med.id && m.ownerUser.trim() === med.ownerUser.trim())
        );

        medList.push(med);
        writeJSON(jsonFile, medList);

        return {
            data: med,
            responseCode: HTTP_STATUS.OK,
            message: "Medication updated successfully."
        };
    },

    remove(id, username) {
        const existing = medList.find(
            m => m.id == id && m.ownerUser.trim() === username.trim()
        );

        if (!existing) {
            return {
                data: null,
                responseCode: HTTP_STATUS.NOT_FOUND,
                message: "Medication not found."
            };
        }

        medList = medList.filter(
            m => !(m.id == id && m.ownerUser.trim() === username.trim())
        );

        writeJSON(jsonFile, medList);

        return {
            data: existing,
            responseCode: HTTP_STATUS.OK,
            message: "Medication removed successfully."
        };
    }
};