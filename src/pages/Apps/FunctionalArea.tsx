import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { appsData } from "../../data/appsData";

export default function FunctionalArea() {
    const { appCode, areaCode } = useParams();

    const app = appsData
        .flatMap((section) => section.apps)
        .find((item) => item.code === appCode);

    const area = app?.functionalAreas.find(
        (item) => item.code === areaCode
    );

    if (!app || !area) {
        return (
            <Box
                sx={{
                    p: 3,
                    backgroundColor: "#f4f7fb",
                    minHeight: "100%",
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #dce3eb",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#123565",
                        }}
                    >
                        Functional Area not found
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: 1.75,
                backgroundColor: "#f4f7fb",
                minHeight: "100%",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dce3eb",
                    borderRadius: 2,
                    p: 2.5,
                    boxShadow: "0 4px 14px rgba(31, 78, 121, 0.06)",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #dce3eb",
                        borderRadius: 2,
                        p: 2.5,
                    }}
                >
                    {/* Header */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: "#1769d2",
                            }}
                        >
                            CORE EPC LIFECYCLE
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 25,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            {area.name}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 11,
                                color: "#718096",
                            }}
                        >
                            {app.code} · Functional Workspace
                        </Typography>
                    </Box>

                    {/* Functional Workspace Header */}
                    <Box
                        sx={{
                            mt: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Functional Workspace
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 9,
                                color: "#718096",
                            }}
                        >
                            Selected from {app.code}
                        </Typography>
                    </Box>

                    {/* Workspace Preview */}
                    <Box
                        sx={{
                            mt: 1,
                            minHeight: 180,
                            border: "1px dashed #cbdcf2",
                            borderRadius: 1.5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fbfdff",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Workspace Preview
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 9,
                                color: "#718096",
                                textAlign: "center",
                            }}
                        >
                            This functional area is ready for the next level
                            of workflow and screen prototyping.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}