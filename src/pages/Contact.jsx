import { Box, Typography, Container, Card, CardContent, Link, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5, px: 2, background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card 
        elevation={10} 
        sx={{ 
          borderRadius: "20px", 
          overflow: "hidden", 
          backgroundColor: "#fff", 
          border: "none", 
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
          p: 4,
          textAlign: "center"
        }}
      >
        <CardContent>
          <Typography 
            variant="h4" 
            gutterBottom 
            fontWeight={700} 
            sx={{ color: "#6a1b9a", fontFamily: "'Dancing Script', cursive" }}
          >
            Contact Us
          </Typography>
          
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
            <LocationOnIcon sx={{ color: "#d81b60" }} fontSize="large" />
            <Typography variant="body1" fontWeight={500} sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
              123 Pickle Street, Hyderabad, India
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
            <PhoneIcon sx={{ color: "#d81b60" }} fontSize="large" />
            <Typography variant="body1" fontWeight={500} sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
              +91 98765 43210
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
            <EmailIcon sx={{ color: "#d81b60" }} fontSize="large" />
            <Typography variant="body1" fontWeight={500} sx={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
                padmajapickles@gmail.com
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <IconButton href="https://www.youtube.com/@padmajapickles" target="_blank" sx={{ color: "#ff0000" }}>
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <IconButton href="https://www.instagram.com/padmajapickles" target="_blank" sx={{ color: "#E1306C" }}>
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Contact;