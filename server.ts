import "dotenv/config";
import express from "express";
import cors from "cors";
import { LoginReqValidate } from "./controller";
const port = process.env.PORT;
const app = express();
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use(express.json());

app.post("/api/auth/login", LoginReqValidate);

app.post("/api/auth/register", (req, res) => {
  console.log(req.body);
});
