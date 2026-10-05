import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useNavigate } from "react-router-dom";

interface AppCardProps {
    number: number;
    code: string;
    name: string;
    status: string;
}

interface ContextMenuPosition {
    mouseX: number;
    mouseY: number;
}

export default function AppCard({
    number,
    code,
    name,
    status,
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
                onClick={() =>
                    navigate(`/apps/${code}`)
                }
                onContextMenu={handleContextMenu}
                sx={{
                    minHeight: 132,
                    backgroundColor: "#ffffff",
                    border: "1px solid #dfe6ee",
                    borderRadius: 2,
                    px: 2,
                    py: 1.75,
                    boxSizing: "border-box",
                    position: "relative",
                    transition: "all 0.2s ease",
                    cursor: "pointer",

                    "&:hover": {
                        borderColor: "#b8cce5",
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
                            fontSize: 9,
                            fontWeight: 700,
                            color: "#8192a7",
                            letterSpacing: 0.4,
                        }}
                    >
                        {String(number).padStart(2, "0")}
                    </Typography>

                    <Box
                        sx={{
                            px: 1,
                            py: 0.35,
                            borderRadius: 0.75,
                            backgroundColor: "#edf4ff",
                            border:
                                "1px solid #d7e7fb",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 9,
                                fontWeight: 700,
                                color: "#1769d2",
                                letterSpacing: 0.3,
                            }}
                        >
                            {code}
                        </Typography>
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
                                fontSize: 19,
                                color: "#1769d2",
                            }}
                        />
                    ) : (
                        <StarBorderIcon
                            sx={{
                                fontSize: 19,
                                color: "#9aa8b8",
                            }}
                        />
                    )}
                </Box>

                <Typography
                    sx={{
                        mt: 1.8,
                        pr: 3,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#17385f",
                        lineHeight: 1.45,
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    sx={{
                        mt: 1.25,
                        fontSize: 9,
                        color: "#8795a7",
                    }}
                >
                    {status}
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
                fontSize: 11,
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
                        fontSize: 18,
                        color: "#1769d2",
                    }}
                />
            ) : (
                <StarBorderIcon
                    sx={{
                        fontSize: 18,
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