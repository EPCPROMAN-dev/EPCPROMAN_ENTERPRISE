import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { appsData } from "../../data/appsData";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

export default function AppDetails() {
    const { appCode } = useParams();
    // const navigate = useNavigate();

    const app = appsData
        .flatMap((section) => section.apps)
        .find((item) => item.code === appCode);

    const [starredAreas, setStarredAreas] = React.useState<string[]>([]);

    React.useEffect(() => {
        const handleOutsideClick = () => {
            setContextMenu(null);
        };
    
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick
            );
        };
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

    
    const [sidebarAreas, setSidebarAreas] = React.useState<string[]>(() => {
        const saved = localStorage.getItem("sidebarAreas");
        return saved ? JSON.parse(saved) : [];
    });

    const [contextMenu, setContextMenu] =
        React.useState<{
            mouseX: number;
            mouseY: number;
            areaCode: string;
        } | null>(null);

    // 1. Opens the menu on right-click
    const handleAreaContextMenu = (
        event: React.MouseEvent,
        areaCode: string
    ) => {
        event.preventDefault();
        event.stopPropagation();

        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
            areaCode,
        });
    };

    // 2. Adds or removes a functional area from the sidebar
    const handleSidebarAreaClick = () => {
        if (!contextMenu) return;

        const areaKey = `${app.code}|${contextMenu.areaCode}`;

        const updatedAreas = sidebarAreas.includes(areaKey)
            ? sidebarAreas.filter((item) => item !== areaKey)
            : [...sidebarAreas, areaKey];

        setSidebarAreas(updatedAreas);

        localStorage.setItem(
            "sidebarAreas",
            JSON.stringify(updatedAreas)
        );

        window.dispatchEvent(new Event("sidebarAppsChanged"));
        setContextMenu(null);
    };

    // 3. Adds or removes a functional area from Favorites
    const handleAreaFavoriteClick = () => {
        if (!contextMenu) return;

        const areaKey = `${app.code}|${contextMenu.areaCode}`;

        const updatedAreas = starredAreas.includes(areaKey)
            ? starredAreas.filter((item) => item !== areaKey)
            : [...starredAreas, areaKey];

        setStarredAreas(updatedAreas);

        localStorage.setItem(
            "starredAreas",
            JSON.stringify(updatedAreas)
        );

        setContextMenu(null);
    };


    return (
        <>
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
                                fontSize: 12,
                                fontWeight: 800,
                                color: "var(--blue)",
                                letterSpacing: 0.5,
                            }}
                        >
                            CORE EPC LIFECYCLE
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 27,
                                fontWeight: 800,
                                 color: "var(--navy)",
                            }}
                        >
                            {app.productCode.toUpperCase()}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 12,
                                color: "var(--gray)",
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
                                // backgroundColor: "#edf4ff",
                                border: "1px solid #cbd9ea",
                                borderRadius: 1,
                                fontSize: 12,
                                fontWeight: 600,
                                color: "var(--blue)",
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
                                color: "var(--blue)",
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
                                fontSize: 19,
                                fontWeight: 800,
                                color: "var(--navy)",
                            }}
                        >
                            Functional Areas
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 10,
                                color: "var(--gray)",
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
                                    onContextMenu={(event) =>
                                        handleAreaContextMenu(event, area.code)
                                    }
                                    // onClick={() =>
                                    //     navigate(
                                    //         `/apps/${app.code}/${area.code}`
                                    //     )
                                    // }
                                    sx={{
                                        minHeight: 88,
                                        backgroundColor: "var(--light-bg)",
                                        border: "1px solid var(--lg-border)",
                                        borderRadius: 2,
                                        px: 1.5,
                                        py: 1.5,
                                        position: "relative",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": 
                                        {
                                            borderColor:"#9fc2ec",
                                            boxShadow:
                                                "0 4px 14px rgba(31, 78, 121, 0.08)",
                                            transform: "translateY(-1px)",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 13,
                                            fontWeight: 800,
                                            color: "var(--navy)",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")} ·{" "}
                                        {area.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: 9,
                                             fontWeight: 700,
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

        {contextMenu && (
            <Box
                onClick={(event) => event.stopPropagation()}
                sx={{
                    position: "fixed",
                    top: contextMenu.mouseY,
                    left: contextMenu.mouseX,
                    minWidth: 200,
                    zIndex: 1500,
                    bgcolor: "#fff",
                    border: "1px solid #e1e7ef",
                    borderRadius: 1.5,
                    boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                }}
            >
                <Box
                    onClick={handleSidebarAreaClick}
                    sx={{
                        minHeight: 42,
                        px: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        fontSize: 12,
                        color: "#294b70",
                        cursor: "pointer",

                        "&:hover": {
                            backgroundColor: "#f3f7fc",
                        },
                    }}
                >
                    <PushPinOutlinedIcon
                        sx={{
                            fontSize: 18,
                            color: "#1769d2",
                        }}
                    />
                   

                    {sidebarAreas.includes(
                        `${app.code}|${contextMenu.areaCode}`
                    )
                        ? "Remove from Sidebar"
                        : "Add to Sidebar"}
                </Box>
                
                <Box
                    onClick={handleAreaFavoriteClick}
                    sx={{
                        minHeight: 42,
                        px: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        fontSize: 11,
                        color: "#294b70",
                        cursor: "pointer",

                        "&:hover": {
                            backgroundColor: "#f3f7fc",
                        },
                    }}
                >
                     {starredAreas.includes(
                        `${app.code}|${contextMenu.areaCode}`
                    ) ? (
                        <StarIcon
                            sx={{
                                fontSize: 19,
                                color: "#1769d2",
                            }}
                        />
                    ) : (
                        <StarBorderIcon
                            sx={{
                                fontSize: 19,
                                color: "#1769d2",
                            }}
                        />
                    )}
                    {starredAreas.includes(
                        `${app.code}|${contextMenu.areaCode}`
                    )
                        ? "Remove from Favorite"
                        : "Add to Favorite"}
                </Box>
            </Box>
        )}             

        </>
    );
}