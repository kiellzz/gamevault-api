import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", gameRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;