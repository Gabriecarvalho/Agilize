import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import routes from "./routes/routes"; // rotas tarefas e projetos
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/middleware";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  }),
);



app.use("/api", userRoute); //manter aqui emcima somente login/cadastro


app.use(authenticateToken); // as rotas abaixo desse autenticador estão protegidas

app.use("/api", routes); // rotas tarefas e projetos

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}).setTimeout(300000); // 5 minutos
