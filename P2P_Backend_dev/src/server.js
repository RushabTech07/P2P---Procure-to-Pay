require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("../src/routes/authRoutes");
const procurementRoutes = require("../src/routes/procurementRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/procurement", procurementRoutes);

app.get("/", (req, res) => {
  res.send("Procurement Backend TEST Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});