import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useNavigate } from "react-router-dom";

interface AppCardProps {
    number?: number;
    code: string;
    productCode: string;
    level:string;
    name: string;
    status: string;
    available: boolean;
    licenseRequired: boolean;
    onLicenseRequired: () => void;
}

interface ContextMenuPosition {
    mouseX: number;
    mouseY: number;
}

export default function AppCard({
    // number,
    code,
    productCode,
    level,
    name,
    status,
    available,
    licenseRequired,
    onLicenseRequired,
}: AppCardProps) {
    const navigate = useNavigate();

    const [starred, setStarred] = React.useState<boolean>(() => {
        const savedApps = localStorage.getItem("starredApps");

        if (!savedApps) {
            return false;
        }

        const apps: string[] = JSON.parse(savedApps);

        return apps.includes(code);
    });

    const [sidebarAdded, setSidebarAdded] =
        React.useState<boolean>(() => {
            const savedApps =
                localStorage.getItem("sidebarApps");

            if (!savedApps) {
                return false;
            }

            const apps: string[] = JSON.parse(savedApps);

            return apps.includes(code);
        });

    const [contextMenu, setContextMenu] =
        React.useState<ContextMenuPosition | null>(null);

    const handleStarClick = (
        event: React.MouseEvent
    ) => {
        event.stopPropagation();

        const savedApps =
            localStorage.getItem("starredApps");

        let apps: string[] = savedApps
            ? JSON.parse(savedApps)
            : [];

        if (starred) {
            apps = apps.filter(
                (appCode) => appCode !== code
            );
        } else {
            apps.push(code);
        }

        localStorage.setItem(
            "starredApps",
            JSON.stringify(apps)
        );

        setStarred(!starred);

        window.dispatchEvent(
            new Event("starredAppsChanged")
        );
    };

    const handleContextMenu = (
        event: React.MouseEvent
    ) => {
        event.preventDefault();
        event.stopPropagation();

        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleSidebarClick = () => {
        const savedApps =
            localStorage.getItem("sidebarApps");

        let apps: string[] = savedApps
            ? JSON.parse(savedApps)
            : [];

        if (sidebarAdded) {
            apps = apps.filter(
                (appCode) => appCode !== code
            );
        } else {
            apps.push(code);
        }

        localStorage.setItem(
            "sidebarApps",
            JSON.stringify(apps)
        );

        setSidebarAdded(!sidebarAdded);

        window.dispatchEvent(
            new Event("sidebarAppsChanged")
        );

        handleCloseContextMenu();
    };

    const handleFavoriteClick = () => {
        const savedApps =
            localStorage.getItem("starredApps");

        let apps: string[] = savedApps
            ? JSON.parse(savedApps)
            : [];

        if (starred) {
            apps = apps.filter(
                (appCode) => appCode !== code
            );
        } else {
            apps.push(code);
        }

        localStorage.setItem(
            "starredApps",
            JSON.stringify(apps)
        );

        setStarred(!starred);

        window.dispatchEvent(
            new Event("starredAppsChanged")
        );

        handleCloseContextMenu();
    };

    React.useEffect(() => {
        const handleClick = () => {
            setContextMenu(null);
        };

        document.addEventListener(
            "click",
            handleClick
        );

        return () => {
            document.removeEventListener(
                "click",
                handleClick
            );
        };
    }, []);

    return (
        <>
            <Box
               onClick={() => {
                    if (licenseRequired || !available) {
                        onLicenseRequired();
                        return;
                    }
                    navigate(`/apps/${code}`);
                }}
                onContextMenu={handleContextMenu}
                sx={{
                    minHeight: 110,
                   backgroundColor: available ? "#ffffff" : "#f7f9fb",
                   border: available ? "1px solid var(--border)" : "1px solid #e5e9ee",
                    borderRadius: 3,
                   px: 1.5,
                    py: 1.25,
                    boxSizing: "border-box",
                    position: "relative",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    boxShadow:"0 3px 12px rgba(10, 35, 70, .04)",

                    "&:hover": {
                        borderColor: available ? "#9fc2ec": "#e5e9ee",
                        boxShadow:
                            "0 4px 14px rgba(31, 78, 121, 0.08)",
                        transform: "translateY(-1px)",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography
                         sx={{
                             fontSize: 10,
                             fontWeight: 800,
                             color: available ? "#8192a7" : "#aeb7c2",
                             letterSpacing: 0.4,
                         }}
                    >
                        {code}
                    </Typography>


                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            px: 1,
                            py: 0.35,
                            borderRadius: 0.75,
                            backgroundColor: "#edf4ff",
                            border: "1px solid #d7e7fb",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 800,
                                color: available ? "#1769d2" : "#aeb7c2",
                                letterSpacing: 0.3,
                            }}
                        >
                            {productCode}
                        </Typography>
                    </Box>
                        
                    {level && (
                        <Box
                            sx={{
                                px: 1,
                                py: 0.35,
                                borderRadius: 0.75,
                                 backgroundColor: "#edf4ff",
                                    border: "1px solid #d7e7fb",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    fontWeight: 800,
                                    // color: available ? "#1769d2" : "#aeb7c2",
                                    color:"#e78200;"
                                }}
                            >
                                {level}
                            </Typography>
                        </Box>
                    )}
                </Box>

                </Box>

                <Box
                    onClick={handleStarClick}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 30,
                        height: 30,
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
                    {starred ? (
                        <StarIcon
                            sx={{
                                fontSize: 20,
                                color: "#e78200;",
                            }}
                        />
                    ) : (
                        <StarBorderIcon
                            sx={{
                                fontSize: 20,
                                color: "#9aa8b8",
                            }}
                        />
                    )}
                </Box>

                <Typography
                    sx={{
                        mt: 1.8,
                        pr: 3,
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#123565",
                        lineHeight: 1.45,
                    }}
                >
                    {name}
                </Typography>

                <Typography
    sx={{
        mt: 1,
        fontSize: 10,
        color: available ? "#8795a7" : "#aeb7c2",
    }}
>
    {status}
</Typography>

<Typography
    sx={{
        mt: 0.5,
        fontSize: 10,
        fontWeight: 600,
        color: available ? "#16834b" : "#b58a52",
    }}
>
    {available ? "✓ Available" : "🔒 Add-on license required"}
</Typography>
            </Box>

            {contextMenu && (
    <Paper
        onClick={(event) =>
            event.stopPropagation()
        }
        sx={{
            position: "fixed",
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            minWidth: 200,
            zIndex: 1500,
            borderRadius: 1.5,
            boxShadow:
                "0 5px 18px rgba(0,0,0,0.18)",
            border: "1px solid #e1e7ef",
            overflow: "hidden",
            backgroundColor: "#ffffff",
        }}
    >
        <Box
            onClick={handleSidebarClick}
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
            <PushPinOutlinedIcon
                sx={{
                    fontSize: 18,
                    color: "#1769d2",
                }}
            />

            {sidebarAdded
                ? "Remove from Sidebar"
                : "Add to Sidebar"}
        </Box>

        <Box
            onClick={handleFavoriteClick}
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
            {starred ? (
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

            {starred
                ? "Remove from Favorite"
                : "Add to Favorite"}
        </Box>
    </Paper>
)}
        </>
    );
}