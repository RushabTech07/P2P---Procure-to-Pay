const pool = require("../config/db");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const request = pool.request();
    await request
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .query("INSERT INTO Vendors (name, email, password) VALUES (@name, @email, @password)");

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const request = pool.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query("SELECT * FROM Vendors WHERE Email = @email");

    if (result.recordset.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.ID, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};