const express = require("express");
const app = express();

app.use(express.json()); // For parsing application/json

// In-memory database to store coupon codes and associated MAC addresses
const couponDatabase = {
  dfgthgbfds: null, // Example coupon with no MAC address linked yet
  crdtfyguihgf: null, // Example coupon already linked to a MAC address
  fghyttgrfedwrt: null,
  trryuhgfrer: null,
  tryhgfsetryt: null,
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/validate_coupon", (req, res) => {
  const { coupon_code, mac_address } = req.body;

  if (!couponDatabase.hasOwnProperty(coupon_code)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid coupon code" });
  }

  const storedMac = couponDatabase[coupon_code];

  if (storedMac === null) {
    // Register the MAC address to this coupon
    couponDatabase[coupon_code] = mac_address;
    return res
      .status(200)
      .json({ success: true, message: "Coupon validated and registered" });
  }

  if (storedMac === mac_address) {
    return res.status(200).json({ success: true, message: "Coupon validated" });
  } else {
    return res
      .status(400)
      .json({
        success: false,
        message: "Coupon already linked to another device",
      });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
