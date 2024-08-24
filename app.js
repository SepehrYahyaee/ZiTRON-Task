import express from "express";
import { userRoutes } from "./routes/index.js";
import { planRoutes } from "./routes/index.js";
import { globalErrorHandler, logger } from "./utilities/index.js";
import morgan from "morgan";
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);

app.get("/", (req, res) => {
    res.send("Hello and Welcome!");
})

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running.`);
});