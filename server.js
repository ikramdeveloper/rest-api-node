import express from "express";
import usersRouter from "./routes/users.router.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("Hello World!");
});

app.use("/users", usersRouter);

app.listen(PORT, console.log(`listening on port ${PORT}...`));
