import express from "express";
import requestLogger from "./middlewares/requestLogger";
import mainRouter from "./routes/mainRouter";
import errHandler from "./middlewares/errHandler";
import dotenv from "dotenv";
import validateEnv from "./services/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(requestLogger);
app.use(mainRouter);
app.use(errHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
