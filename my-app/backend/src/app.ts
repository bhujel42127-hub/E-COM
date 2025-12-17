import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import productRoutes from "./routes/product.routes";
import uploadRoutes from "./routes/upload.routes"
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.PORT);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
app.use("/auth", authRoutes);
app.use("/admins", adminRoutes);
app.use("/products", productRoutes);
app.use("/api", uploadRoutes);

export default app;
