import { Box } from "@mui/material";

const ConversationalPanel = () => {
  return (
    <Box
      sx={{
        flex: "1 1 80%",
        backgroundColor: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0px 5px 18px rgba(10, 35, 70, 0.06)",
        height: "100%",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      Conversational Panel
    </Box>
  )
}

export default ConversationalPanel