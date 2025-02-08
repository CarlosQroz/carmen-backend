import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import periodsRoutes from "./routes/periods.routes.js";
import productsRoutes from "./routes/products.routes.js";
import variantesRoutes from "./routes/variantes_producto.routes.js";
import stocksRoutes from "./routes/stocks.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import objectRoutes from "./routes/objects.routes.js";
import detailRoutes from "./routes/details.routes.js";
import uploadRoutes from "./routes/upload.routes.js"; // Asegúrate de importar correctamente

// Obtener el __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Middleware para procesar fechas en el cuerpo de la solicitud
app.use((req, res, next) => {
  for (const key in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      if (typeof req.body[key] === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(req.body[key])) {
        req.body[key] = new Date(req.body[key]);
      }
    }
  }
  next();
});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas principales
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", periodsRoutes);
app.use("/api", productsRoutes);
app.use("/api", variantesRoutes);
app.use("/api", stocksRoutes);
app.use("/api", ventasRoutes);
app.use("/api", categoryRoutes);
app.use("/api", objectRoutes);
app.use("/api", detailRoutes);
app.use("/api", uploadRoutes); // Ruta para cargar archivos

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
