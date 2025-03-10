import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const port = process.env.PORT || 8080;
const serviceName = process.env.SERVICE_NAME || "inventory-service";

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Error Handler
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
);

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
