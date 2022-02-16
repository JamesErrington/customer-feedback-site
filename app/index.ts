import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";

import { handleProductRequest, handleCommentRequest, handleCommentPostRequest, handleChartRequest } from "./handlers";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(morgan("short"));
app.use(bodyParser.json());

const api = express.Router();
api.get("/product", handleProductRequest);
api.get("/comments", handleCommentRequest);
api.post("/comment", handleCommentPostRequest);
api.get("/chart", handleChartRequest);
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
