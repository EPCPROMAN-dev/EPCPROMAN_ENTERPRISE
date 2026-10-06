import React from "react";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

import { appsData } from "../../data/appsData";

const drawerWidth = 245;
const closedDrawerWidth = 65;

interface SidebarProps {
    open: boolean;
}

interface MenuItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden" as const,
});

const closedMixin = (theme: Theme) => ({
    width: closedDrawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden" as const,
});

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    width: open ? drawerWidth : closedDrawerWidth,

    flexShrink: 0,

    whiteSpace: "nowrap",

    boxSizing: "border-box",

    ...(open && {
        ...openedMixin(theme),

        "& .MuiDrawer-paper": {
            ...openedMixin(theme),
        },
    }),

    ...(!open && {
        ...closedMixin(theme),

        "& .MuiDrawer-paper": {
            ...closedMixin(theme),
        },
    }),
}));

const mainMenu: MenuItem[] = [
    {
        name: "For you",
        icon: <RadioButtonCheckedIcon />,
        path: "/for-you",
    },
    {
        name: "Recent",
        icon: <HistoryIcon />,
        path: "/recent",
    },
    {
        name: "Time Sheet",
        icon: <AccessTimeIcon />,
        path: "/time-sheet",
    },
    {
        name: "Calendar",
        icon: <CalendarMonthIcon />,
        path: "/calendar",
    },
    {
        name: "Starred",
        icon: <StarBorderIcon />,
        path: "/starred",
    },
];

const workspaceMenu: MenuItem[] = [
    {
        name: "Apps",
        icon: <AppsOutlinedIcon />,
        path: "/apps",
    },
];

export default function Sidebar({ open }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarApps, setSidebarApps] = React.useState<string[]>([]);

    const loadSidebarApps = () => {
        const savedApps = localStorage.getItem("sidebarApps");

        if (savedApps) {
            setSidebarApps(JSON.parse(savedApps));
        } else {
            setSidebarApps([]);
        }
    };

    React.useEffect(() => {
        loadSidebarApps();

        const handleSidebarChange = () => {
            loadSidebarApps();
        };

        window.addEventListener(
            "sidebarAppsChanged",
            handleSidebarChange
        );

        return () => {
            window.removeEventListener(
                "sidebarAppsChanged",
                handleSidebarChange
            );
        };
    }, []);

    const allApps = appsData.flatMap(
        (section) => section.apps
    );

    const myApps = allApps.filter((app) =>
        sidebarApps.includes(app.code)
    );

    return (
        <StyledDrawer
            variant="permanent"
            open={open}
            sx={{
                "& .MuiDrawer-paper": {
                    top: "64px",
                    height: "calc(100vh - 64px)",
                    borderRight: "1px solid #dce3eb",
                    backgroundColor: "#ffffff",
                },
            }}
        >
            {/* MAIN MENU */}

            <List
                sx={{
                    pt: 1,
                }}
            >
                {mainMenu.map((item) => (
                    <ListItem
                        key={item.name}
                        disablePadding
                        sx={{
                            display: "block",
                        }}
                    >
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={{
                                minHeight: 42,
                                width: "100%",
                                px: open ? 2 : 0,
                                justifyContent: open
                                    ? "initial"
                                    : "center",
                                borderRadius: "7px",
                                mx: open ? 1 : 0,

                                "&:hover": {
                                    backgroundColor: "#f3f7fc",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 24,
                                    width: 24,
                                    height: 24,
                                    mr: open ? 2 : 0,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#526b86",

                                    "& svg": {
                                        fontSize: 17,
                                    },
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.name}
                                sx={{
                                    display: open
                                        ? "block"
                                        : "none",

                                    "& .MuiTypography-root": {
                                        fontSize: "13px",
                                        color: "#294b70",
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

             {/* WORKSPACE MENU */}

            <List
                sx={{
                    pt: 0,
                }}
            >
                {workspaceMenu.map((item) => {
                    const selected =
                        item.path === "/apps"
                            ? location.pathname.startsWith(
                                  "/apps"
                              )
                            : location.pathname ===
                              item.path;

                    return (
                        <ListItem
                            key={item.name}
                            disablePadding
                            sx={{
                                display: "block",
                            }}
                        >
                            <ListItemButton
                                onClick={() =>
                                    navigate(item.path)
                                }
                                selected={selected}
                                sx={{
                                    minHeight: 42,

                                    px: open ? 2 : 0,

                                    mx: open ? 1 : 0,

                                    borderRadius: "7px",

                                    justifyContent: open
                                        ? "initial"
                                        : "center",

                                    "&:hover": {
                                        backgroundColor:
                                            "#f3f7fc",
                                    },

                                    "&.Mui-selected": {
                                        backgroundColor:
                                            "#e5effc",
                                    },

                                    "&.Mui-selected:hover": {
                                        backgroundColor:
                                            "#dceafb",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 24,
                                        width: 24,
                                        height: 24,
                                        mr: open ? 2 : 0,
                                        flexShrink: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent:
                                            "center",

                                        color: selected
                                            ? "#1769d2"
                                            : "#526b86",

                                        "& svg": {
                                            fontSize: 17,
                                        },
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.name}
                                    sx={{
                                        display: open
                                            ? "block"
                                            : "none",

                                        "& .MuiTypography-root": {
                                            fontSize: "13px",

                                            fontWeight:
                                                selected
                                                    ? 700
                                                    : 400,

                                            color: selected
                                                ? "#1769d2"
                                                : "#294b70",
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* MY APPS */}

            {open && myApps.length > 0 && (
                <Typography
                    sx={{
                        px: 2.5,
                        mt: 1,
                        mb: 1,
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        color: "#8a9bad",
                    }}
                >
                    MY WORKSPACE
                </Typography>
            )}

            {myApps.length > 0 && (
                <List
                    sx={{
                        pt: 0,
                    }}
                >
                    {myApps.map((app) => {
                        const selected =
                            location.pathname.startsWith(
                                `/apps/${app.code}`
                            );

                        return (
                            <ListItem
                                key={app.code}
                                disablePadding
                                sx={{
                                    display: "block",
                                }}
                            >
                                <ListItemButton
                                    onClick={() =>
                                        navigate(
                                            `/apps/${app.code}`
                                        )
                                    }
                                    selected={selected}
                                    sx={{
                                        minHeight: 42,

                                        px: open ? 2 : 0,

                                        mx: open ? 1 : 0,

                                        borderRadius: "7px",

                                        justifyContent: open
                                            ? "initial"
                                            : "center",

                                        "&:hover": {
                                            backgroundColor:
                                                "#f3f7fc",
                                        },

                                        "&.Mui-selected": {
                                            backgroundColor:
                                                "#e5effc",
                                        },

                                        "&.Mui-selected:hover": {
                                            backgroundColor:
                                                "#dceafb",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 24,
                                            width: 24,
                                            height: 24,
                                            mr: open ? 2 : 0,
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:
                                                "center",

                                            color: selected
                                                ? "#1769d2"
                                                : "#526b86",

                                            "& svg": {
                                                fontSize: 17,
                                            },
                                        }}
                                    >
                                        <AppsOutlinedIcon />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={app.name}
                                        sx={{
                                            display: open
                                                ? "block"
                                                : "none",

                                            "& .MuiTypography-root": {
                                                fontSize: "13px",

                                                fontWeight:
                                                    selected
                                                        ? 700
                                                        : 400,

                                                color: selected
                                                    ? "#1769d2"
                                                    : "#294b70",

                                                whiteSpace:
                                                    "nowrap",

                                                overflow:
                                                    "hidden",

                                                textOverflow:
                                                    "ellipsis",
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}

            {/* WORKSPACES TITLE */}

            {/* {open && (
                <Typography
                    sx={{
                        px: 2.5,
                        mt: 1,
                        mb: 1,
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        color: "#8a9bad",
                    }}
                >
                    MY WORKSPACE
                </Typography>
            )} */}

           
        </StyledDrawer>
    );
}