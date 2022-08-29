import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Banner from "./Banner"
import OpenJobListing from "./OpenJobListing";

function Home() {

  useEffect(() => {
    document.body.style.backgroundColor = "#111a20";

    return () => {
      document.body.style.backgroundColor = "#111a20";
    };
  }, []);

  return (
    <Box sx={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}>
      
      <Banner/>

      <div style={{ padding: "80px 0 120px 0", width: "90%", margin: "auto", maxWidth: "1024px" }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 2, }}>
          Open Positions
        </Typography>
        <Typography
          sx={{ textAlign: "center", maxWidth: "768px", margin: "0 auto 80px auto" }}
        >
          Our data is training and testing autonomous systems at companies around
          the world. We're looking for talented visionaries to help us to expand
          our impact on the way artificial intelligence is developed.
        </Typography>
        
        <OpenJobListing/>

      </div>

    </Box>
  );
}

export default Home;
