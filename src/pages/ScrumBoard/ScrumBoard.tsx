// import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function  ScrumBoard() {

    return (
        <Box
            sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "#12345b",
                }}
            >
            Scrum Board
            </Typography>


            <Typography
                sx={{
                    mt: 1,
                    color: "#718096",
                }}
            >
                This is the main workspace.
            </Typography>

        </Box>
    );
}