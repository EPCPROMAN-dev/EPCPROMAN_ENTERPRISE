import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { appsData } from "../../data/appsData";

export default function AppDetails() {
    const { appCode } = useParams();
    // const navigate = useNavigate();

    const app = appsData
        .flatMap((section) => section.apps)
        .find((item) => item.code === appCode);

    const [starredAreas, setStarredAreas] = React.useState<string[]>([]);

    React.useEffect(() => {
        const savedAreas = localStorage.getItem("starredAreas");

        if (savedAreas) {
            setStarredAreas(JSON.parse(savedAreas));
        }
    }, []);

    if (!app) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Application not found.</Typography>
            </Box>
        );
    }

    const handleAreaStar = (
        event: React.MouseEvent,
        areaCode: string
    ) => {
        event.stopPropagation();

        const areaKey = `${app.code}|${areaCode}`;

        let updatedAreas = [...starredAreas];

        if (starredAreas.includes(areaKey)) {
            updatedAreas = updatedAreas.filter(
                (item) => item !== areaKey
            );
        } else {
            updatedAreas.push(areaKey);
        }

        setStarredAreas(updatedAreas);

        localStorage.setItem(
            "starredAreas",
            JSON.stringify(updatedAreas)
        );
    };

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
                    border: "1px solid #dfe6ee",
                    borderRadius: 2,
                    p: 2.5,
                }}
            >
                {/* App Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#1769d2",
                                letterSpacing: 0.5,
                            }}
                        >
                            CORE EPC LIFECYCLE
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 26,
                                fontWeight: 700,
                                color: "#17385f",
                            }}
                        >
                            {app.productCode}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 12,
                                color: "#66788f",
                            }}
                        >
                            {app.name}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.75,
                                backgroundColor: "#edf4ff",
                                borderRadius: 1,
                                fontSize: 10,
                                fontWeight: 600,
                                color: "#1769d2",
                            }}
                        >
                            ▪ Dashboard
                        </Box>

                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.75,
                                border: "1px solid #cbd9ea",
                                borderRadius: 1,
                                fontSize: 10,
                                fontWeight: 600,
                                color: "#1769d2",
                            }}
                        >
                            ▤ Reports
                        </Box>
                    </Box>
                </Box>

                {/* Functional Areas */}
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "#17385f",
                            }}
                        >
                            Functional Areas
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 10,
                                color: "#66788f",
                            }}
                        >
                            {app.functionalAreas.length} areas
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)",
                            },
                            gap: 1.5,
                        }}
                    >
                        {app.functionalAreas.map((area, index) => {
                            const areaKey = `${app.code}|${area.code}`;
                            const isStarred =
                                starredAreas.includes(areaKey);

                            return (
                                <Box
                                    key={area.code}
                                    onClick={() => {
                                        window.open(area.url, "_blank");
                                    }}
                                    // onClick={() =>
                                    //     navigate(
                                    //         `/apps/${app.code}/${area.code}`
                                    //     )
                                    // }
                                    sx={{
                                        minHeight: 88,
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #dfe6ee",
                                        borderRadius: 2,
                                        px: 1.5,
                                        py: 1.5,
                                        position: "relative",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#b8cce5",
                                            boxShadow:
                                                "0 4px 14px rgba(31, 78, 121, 0.08)",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 9,
                                            fontWeight: 700,
                                            color: "#1769d2",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")} ·{" "}
                                        {area.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: 9,
                                            color: "#8795a7",
                                        }}
                                    >
                                        Open functional workspace
                                    </Typography>

                                    <Box
                                        onClick={(event) =>
                                            handleAreaStar(
                                                event,
                                                area.code
                                            )
                                        }
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            width: 28,
                                            height: 28,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f3f7fc",
                                            },
                                        }}
                                    >
                                        {isStarred ? (
                                            <StarIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "#1769d2",
                                                }}
                                            />
                                        ) : (
                                            <StarBorderIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "#9aa8b8",
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}