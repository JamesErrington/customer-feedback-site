import express from "express";
import morgan from "morgan";
import path from "path";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(morgan("short"));

const api = express.Router();
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
