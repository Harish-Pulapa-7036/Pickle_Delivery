import React from "react";
import { Box, Typography } from "@mui/material";
import "./MarqueeText.css"; // Import the CSS file

const MarqueeText = () => {
  return (
    <Box className="marquee-container">
      <Typography variant="h6" className="marquee-text">
      🎉 Welcome to our Pickle Store! 🚚 Delivery charges apply. 📞 We’ll contact you once your order is placed✨.
      </Typography>
    </Box>
  );
};

export default MarqueeText;
