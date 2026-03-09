const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});
const axios = require("axios");

exports.createProcurement = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    
    if (!req.user || !req.user.email) {
      console.log("User not authenticated or email missing");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const auth = Buffer.from(
      `${process.env.SN_USERNAME}:${process.env.SN_PASSWORD}`
    ).toString("base64");

    console.log("Credentials set:", auth ? "Yes" : "No");
    console.log("User Email:- "+req.user.email);
    console.log("item_name:- "+req.body.item_name);
    console.log("description:- "+req.body.description);
    console.log("quantity:- "+req.body.quantity);

    const response = await axios.post(
      "https://dev201019.service-now.com/api/x_1837928_procurem/procurement_api/create",
      {
        requested_by: req.user.email,
        item_name: req.body.item_name,
        description: req.body.description,
        quantity: req.body.quantity
      },
      {
        httpsAgent: agent,
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("SERVICE NOW ERROR:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);

    res.status(500).json(
      error.response?.data || { message: "Internal Server Error", error: error.message }
    );
  }
};


exports.getMyProcurements = async (req, res) => {
  try {
    const email = req.query.email || req.user?.email; // Use query param first, fallback to user
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const auth = Buffer.from(
      `${process.env.SN_USERNAME}:${process.env.SN_PASSWORD}`
    ).toString("base64");

    const response = await axios.get(
      `https://dev201019.service-now.com/api/x_1837928_procurem/procurement_api/getByUser?email=${email}`,
      {
        httpsAgent: agent,
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json"
        }
      }
    );

    res.json(response.data);
    console.log("Procurements retrieved successfully for email:", email, JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error("SERVICE NOW ERROR:");
    console.error(error.response?.data || error.message);

    res.status(500).json(
      error.response?.data || { message: "Internal Server Error" }
    );
  }
};