import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const policies = [
    { 
        title: "Delivery Policy", 
        description: "We ensure quick and safe delivery within 1-2 business days locally near Singh Nagar, Vijayawada. For the rest of the Telugu states, delivery will take 3-4 business days.",
        icon: <LocalShippingIcon color="primary" /> 
    },
    { 
        title: "Return & Refund Policy", 
        description: "No return and No exchange.", 
        icon: <SecurityIcon color="secondary" /> 
    },
   
];

const Policies = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Our Delivery Policies
            </Typography>
            {policies.map((policy, index) => (
                <Accordion key={index} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {policy.icon}
                            <Typography variant="h6">{policy.title}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{policy.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Policies;
