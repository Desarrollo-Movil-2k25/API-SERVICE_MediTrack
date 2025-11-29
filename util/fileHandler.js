import fs from "fs";

export function readJSON(path) {
    try {
        const raw = fs.readFileSync(path, "utf8");
        return JSON.parse(raw);
    } catch (err) {
        console.error("Error al leer archivo:", err);
        return [];
    }
}

export function writeJSON(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error al escribir archivo:", err);
        return false;
    }
}