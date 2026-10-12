import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { appsData } from "../../data/appsData";

export default function Starred() {
    const navigate = useNavigate();

    const [starredApps, setStarredApps] = React.useState<string[]>([]);
    const [starredAreas, setStarredAreas] = React.useState<string[]>([]);

    React.useEffect(() => {
        const savedApps = localStorage.getItem("starredApps");
        const savedAreas = localStorage.getItem("starredAreas");

        if (savedApps) {
            setStarredApps(JSON.parse(savedApps));
        }

        if (savedAreas) {
            setStarredAreas(JSON.parse(savedAreas));
        }
    }, []);

    const allApps = appsData.flatMap((section) => section.apps);

   const apps = allApps
    .filter((app) => starredApps.includes(app.code))
    .sort(
        (a, b) =>
            starredApps.indexOf(b.code) -
            starredApps.indexOf(a.code)
    );

    const allAreas = allApps.flatMap((app) =>
        app.functionalAreas.map((area) => ({
            ...area,
            appCode: app.code,
            appName: app.name,
        }))
    );

  const areas = allAreas
    .filter((area) =>
        starredAreas.includes(`${area.appCode}|${area.code}`)
    )
    .sort(
        (a, b) =>
            starredAreas.indexOf(`${b.appCode}|${b.code}`) -
            starredAreas.indexOf(`${a.appCode}|${a.code}`)
    );

    const removeAppStar = (code: string) => {
        const updatedApps = starredApps.filter(
            (appCode) => appCode !== code
        );

        setStarredApps(updatedApps);

        localStorage.setItem(
            "starredApps",
            JSON.stringify(updatedApps)
        );
    };

    const removeAreaStar = (appCode: string, areaCode: string) => {
        const areaKey = `${appCode}|${areaCode}`;

        const updatedAreas = starredAreas.filter(
            (item) => item !== areaKey
        );

        setStarredAreas(updatedAreas);

        localStorage.setItem(
            "starredAreas",
            JSON.stringify(updatedAreas)
        );
    };

    const totalBookmarked = apps.length + areas.length;

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
                  
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            border: "1px solid #dfe6ee",
                            borderRadius: 2,
                            p: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxSizing: "border-box",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                   fontSize: 12,
                                fontWeight: 800,
                                color: "var(--blue)",
                                letterSpacing: 0.5,
                                textTransform: "uppercase",
                                }}
                            >
                                Quick Access
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                   fontSize: 27,
                                fontWeight: 800,
                                 color: "var(--navy)",
                                }}
                            >
                                Starred
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                    fontSize: 12,
                                color: "var(--gray)",
                                }}
                            >
                                Your bookmarked applications and functional areas
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: 100,
                                px: 2,
                                py: 1.5,
                                border: "1px solid #dfe6ee",
                                borderRadius: 2,
                                textAlign: "center",
                                boxSizing: "border-box",
                            }}
                        >
                            <Typography
                                sx={{
                                     fontSize: 27,
                                fontWeight: 800,
                                    color: "#1769d2",
                                }}
                            >
                                {totalBookmarked}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 12,
                                color: "var(--gray)",
                                }}
                            >
                                Bookmarked
                            </Typography>
                        </Box>
                    </Box>

                    {/* Bookmarked Apps */}
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 19,
                                fontWeight: 800,
                                color: "var(--navy)",
                                }}
                            >
                               Apps
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: "var(--gray)",
                                }}
                            >
                                {apps.length} apps
                            </Typography>
                        </Box>

                        {apps.length === 0 ? (
                            <Box
                                sx={{
                                    width: 415,
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dfe6ee",
                                    borderRadius: 2,
                                    p: 4,
                                    textAlign: "center",
                                    boxSizing: "border-box",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "#17385f",
                                    }}
                                >
                                    Nothing starred yet
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        fontSize: 11,
                                        color: "#8795a7",
                                    }}
                                >
                                    Star an application to create your quick
                                    access list.
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: 415,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                {apps.map((app) => (
                                    <Box
                                        key={app.code}
                                        sx={{
                                            width: "100%",
                                            backgroundColor:"#ffffff" ,
                                            border: "1px solid var(--border)",
                                            borderRadius: 3,
                                            px: 1.5,
                                            py: 1.25,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            boxSizing: "border-box",
                                            transition: "all 0.2s ease",
                                              boxShadow:"0 3px 12px rgba(10, 35, 70, .04)",
                                            "&:hover": {
                                                borderColor: "#9fc2ec",
                                                boxShadow:
                                                    "0 3px 10px rgba(31, 78, 121, 0.06)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <StarIcon
                                                onClick={() =>
                                                    removeAppStar(app.code)
                                                }
                                                sx={{
                                                    fontSize: 19,
                                                    color: "var(--gold)",
                                                    cursor: "pointer",
                                                }}
                                            />

                                            <Box>
                                                <Typography
                                                    onClick={() =>
                                                        navigate(
                                                            `/apps/${app.code}`
                                                        )
                                                    }
                                                    sx={{
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        color: "var(--navy)",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            color: "#1769d2",
                                                        },
                                                    }}
                                                >
                                                    {app.productCode}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        mt: 0.3,
                                                        fontSize: 12,
                                                        color: "var(--gray)",
                                                    }}
                                                >
                                                    {app.name}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box
                                            onClick={() =>
                                                navigate(`/apps/${app.code}`)
                                            }
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                px: 1,
                                                py: 0.6,
                                                borderRadius: 1,
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "#edf4ff",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: "#1769d2",
                                                }}
                                            >
                                                Open
                                            </Typography>

                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#1769d2",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Functional Areas */}
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: "var(--navy)",
                                }}
                            >
                                Functional Areas
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: "#8795a7",
                                    marginLeft: 1,
                                }}
                            >
                                {areas.length} areas
                            </Typography>
                        </Box>

                        {areas.length === 0 ? (
                            <Box
                                sx={{
                                    width: 415,
                                    minHeight: 68,
                                    backgroundColor: "#ffffff",
                                    border: "1px dashed #cbd7e5",
                                    borderRadius: 2,
                                    p: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    boxSizing: "border-box",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 11,
                                        color: "#8795a7",
                                    }}
                                >
                                    Starred functional areas will appear here
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: 415,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                {areas.map((area) => (
                                    <Box
                                        key={`${area.appCode}|${area.code}`}
                                        sx={{
                                            width: "100%",
                                            backgroundColor:"#ffffff" ,
                                            border: "1px solid var(--border)",
                                            borderRadius: 3,
                                            px: 1.5,
                                            py: 1.25,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            boxSizing: "border-box",
                                            transition: "all 0.2s ease",
                                              boxShadow:"0 3px 12px rgba(10, 35, 70, .04)",
                                            "&:hover": {
                                                borderColor: "#9fc2ec",
                                                boxShadow:
                                                    "0 3px 10px rgba(31, 78, 121, 0.06)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <StarIcon
                                                onClick={() =>
                                                    removeAreaStar(
                                                        area.appCode,
                                                        area.code
                                                    )
                                                }
                                                sx={{
                                                    fontSize: 19,
                                                    color: "var(--gold)",
                                                    cursor: "pointer",
                                                }}
                                            />

                                            <Box>
                                                <Typography
                                                    onClick={() =>
                                                        navigate(
                                                            `/apps/${area.appCode}/${area.code}`
                                                        )
                                                    }
                                                    sx={{
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        color: "var(--navy)",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            color: "#1769d2",
                                                        },
                                                    }}
                                                >
                                                    {area.name}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        mt: 0.3,
                                                        fontSize: 12,
                                                        color: "var(--gray)",
                                                    }}
                                                >
                                                    {area.appCode}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box
                                            onClick={() =>
                                                navigate(
                                                    `/apps/${area.appCode}/${area.code}`
                                                )
                                            }
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                px: 1,
                                                py: 0.6,
                                                borderRadius: 1,
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "#edf4ff",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: "#1769d2",
                                                }}
                                            >
                                                Open
                                            </Typography>

                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#1769d2",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}