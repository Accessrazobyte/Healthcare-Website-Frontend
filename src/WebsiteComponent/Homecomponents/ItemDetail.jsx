import React from "react";
import { useCart } from "../../Components/MainRoute/CartContext";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ⭐ MATERIAL UI IMPORTS
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ⭐ Toast Import
import { toast } from "react-toastify";

const ItemDetail = () => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: "URINE EXAMINATION, ROUTINE; URINE, R/E",
      price: 120,
    });

    // ⭐ Beautiful Notification
    toast.success("Added to Cart Successfully!", {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh", py: 5 }}>
        <Grid container spacing={4} maxWidth="lg" sx={{ mx: "auto", px: 2 }}>

          {/* ---------------- LEFT SIDE ---------------- */}
          <Grid item xs={12} md={8}>
            <Card elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight={700}>
                URINE EXAMINATION, ROUTINE; URINE, R/E in Kathmandu
              </Typography>

              {/* TEST COUNT */}
              <Chip
                label="18 Tests"
                color="primary"
                variant="outlined"
                sx={{ mt: 2 }}
              />

              {/* SERVICE BOXES */}
              <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
                <Box
                  sx={{
                    bgcolor: "#039e9e",
                    color: "#fff",
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    width: 220,
                    textAlign: "center",
                  }}
                >
                  Home Sample Collection
                </Box>

                <Box
                  sx={{
                    bgcolor: "#039e9e",
                    color: "#fff",
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    width: 220,
                    textAlign: "center",
                  }}
                >
                  Online Reports
                </Box>
              </Box>

              {/* DESCRIPTION */}
              <Box sx={{ mt: 5 }}>
                <Typography variant="h6" fontWeight={600}>
                  Description
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                  Urine analysis helps detect a wide range of medical conditions.
                </Typography>
              </Box>

              {/* REMARKS */}
              <Box sx={{ mt: 5 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Test Remark
                </Typography>

                <Accordion elevation={1}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>
                      URINE EXAMINATION, ROUTINE; URINE, R/E
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      This is the remark information about the urine test.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Card>
          </Grid>

          {/* ---------------- RIGHT SIDE (PRICE CARD) ---------------- */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                position: "sticky",
                top: "90px",
              }}
            >
              <Typography variant="h5" fontWeight={700} color="primary">
                Rs 120
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.4, fontSize: "16px", bgcolor: "#1976d2" }}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export default ItemDetail;
