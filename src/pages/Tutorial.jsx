import React from "react";
import { Card, CardMedia, CardContent, Typography, Container } from "@mui/material";

const Tutorial = ({ videoSrc, title = "Tutorial Video", description = "Watch our tutorial to learn more!" }) => {
    return (
            <Card sx={{ maxWidth: 800, boxShadow: 4 }}>
                <video
                    width="100%"
                    height="400"
                    controls
                    style={{ borderRadius: "8px" }}
                >
                    <source src={'/videos/tutorial.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" align="center">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
    );
};

export default Tutorial;
