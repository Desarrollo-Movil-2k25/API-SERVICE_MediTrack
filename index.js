'use strict';

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json()); // Para recibir JSON

// === Rutas ===
app.use("/api/users", userRoutes);

// === Puerto ===
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
