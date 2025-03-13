import { Box, Typography, Container, Card, CardContent } from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5, px: 2 }}>
      <Card 
        elevation={5} 
        sx={{ 
          borderRadius: 0, 
          overflow: "hidden", 
          backgroundColor: "#f4e1c6", 
          border: "2px solid #8b5e3b", 
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          position: "relative",
          '&:before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
            opacity: 0.3,
            pointerEvents: "none",
          },
          '&:after': {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "radial-gradient(circle, rgba(244,225,198,0) 60%, rgba(139,94,59,0.8) 100%)",
            maskImage: "url('https://www.transparenttextures.com/patterns/torn-paper-edge.png')",
            WebkitMaskImage: "url('https://www.transparenttextures.com/patterns/torn-paper-edge.png')",
          }
        }}
      >
        <CardContent sx={{ textAlign: "center", p: { xs: 2, md: 4 } }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            fontWeight={600} 
            sx={{ color: "#5a3e1b", fontFamily: "cursive" }}
          >
            Welcome to Padmaja Pickles
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="primary" 
            gutterBottom 
            sx={{ fontStyle: "italic" }}
          >
            A Legacy of Authentic Flavors
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph 
            sx={{ fontFamily: "Georgia, serif", color: "#4a2c16" }}
          >
            At <strong>Padmaja Pickles</strong>, we bring you the rich, traditional taste of homemade pickles crafted with love and care. Our recipes have been passed down through generations, ensuring that every jar is packed with authentic flavors, premium ingredients, and a touch of nostalgia.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph 
            sx={{ fontFamily: "Georgia, serif", color: "#4a2c16" }}
          >
            We use <strong>fresh, handpicked ingredients</strong>, traditional sun-drying techniques, and a perfect blend of spices to create pickles that are not only delicious but also free from artificial preservatives.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph 
            sx={{ fontFamily: "Georgia, serif", color: "#4a2c16" }}
          >
            Whether you crave the tangy zest of mango pickle, the fiery heat of chili pickle, or the comforting taste of classic lemon pickle, we have something to satisfy every palate.
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="secondary" 
            fontWeight={500} 
            sx={{ fontFamily: "cursive", color: "#8b5e3b" }}
          >
            Experience the taste of homemade goodness – where tradition meets taste!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutUs;
