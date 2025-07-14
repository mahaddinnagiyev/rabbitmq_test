const express = require("express");
const rabbitRouter = require("./rabbit.controller")

const PORT = 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", rabbitRouter)

app.listen(PORT, () => {
  console.log(`Server is working on port: ${PORT}`);
});
