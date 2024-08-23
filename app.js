import express from "express";
import { userRoutes } from "./routes/index.js";
import { planRoutes } from "./routes/index.js";
import { globalErrorHandler } from "./utilities/index.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);

app.get("/", (req, res) => {
    res.send("Hello and Welcome!");
})

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => console.log("app is running on port:", process.env.PORT));