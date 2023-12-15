require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const app = express();
const portFolioRoutes = require("./routes/portFolioRoutes");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorMiddleware");


const corsOptions = {
  origin: "http://127.0.0.1/5173",
  methods: "GET,POST,PUT,GET,DELETE,PATCH",
};
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello from server");
});
app.use("/api/portfolio", portFolioRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`.yellow.bold);
});
