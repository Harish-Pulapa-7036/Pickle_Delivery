import { useRef, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

const Tutorial = () => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    const video = video1Ref.current;
    if (video) {
      // Wait until video is loaded enough to play
      const playVideo = () => {
        video.play().catch((error) => console.log("Autoplay prevented:", error));
      };
      video.addEventListener("canplaythrough", playVideo);
      return () => video.removeEventListener("canplaythrough", playVideo);
    }
  }, []);

  const handlePlay = (videoRef) => {
    if (videoRef === video1Ref.current) {
      video2Ref.current.pause();
    } else {
      video1Ref.current.pause();
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          mt: 3,
        }}
      >
        {/* Video 1: How to Signup and Login */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
          How to Signup and Login? 🔑😊
          </Typography>
          <video
            ref={video1Ref}
            src="/videos/signup_video.mp4"
            controls
            muted
            onPlay={() => handlePlay(video1Ref.current)}
            style={{
              width: "100%",
              maxWidth: "180px",
              borderRadius: "10px",
              border: "4px solid white"
            }}
          />
        </Box>

        {/* Video 2: How to Place an Order */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
          🛒 How to Place an Order? 📦
          </Typography>
          <video
            ref={video2Ref}
            src="/videos/order_video.mp4"
            controls
            onPlay={() => handlePlay(video2Ref.current)}
            style={{
              width: "100%",
              maxWidth: "180px",
              borderRadius: "10px",
              border: "4px solid white"
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Tutorial;
