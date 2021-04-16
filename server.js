const mongoose = require("mongoose");
const http = require("http");

const app = require("./app");

const connectionString =
  "mongodb+srv://alex:1234password@cluster0.gryjq.mongodb.net/PsychiatristDB?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  });

const server = http.createServer(app);

const PORT = 5000;

server.listen(PORT, () => {
  console.log("Server connected to PORT: ", PORT);
});
