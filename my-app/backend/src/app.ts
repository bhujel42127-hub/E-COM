import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import "dotenv/config";

// console.log(process.env.PORT);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/auth", authRoutes);

export default app;
