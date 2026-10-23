import React from "react";
// import Tooltip from "@mui/material/Tooltip";
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
import Box from "@mui/material/Box";
import CustomTooltip from "../Common/CustomTooltip"

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

interface SidebarEntry {
    id: string;
    type: "app" | "area";
    appCode: string;
    code: string;
    name: string;
    appName?: string;
    url?: string;
}

// sidebar when open
const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    // typescripts takes this property as a property not as a srting
    overflowX: "hidden" as const, 
});

// sidebar whne closed
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
        path: "/timesheet",
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
    const [sidebarAreas, setSidebarAreas] = React.useState<string[]>([]);
    const [sidebarOrder, setSidebarOrder] = React.useState<string[]>([]);
    const [draggedItem, setDraggedItem] = React.useState<string | null>(null);

    const loadSidebarApps = () => {
        const savedApps: string[] = JSON.parse(
            localStorage.getItem("sidebarApps") || "[]"
        );

        const savedAreas: string[] = JSON.parse(
            localStorage.getItem("sidebarAreas") || "[]"
        );

        const pinnedIds = [
            ...savedApps.map((code) => `app:${code}`),
            ...savedAreas.map((key) => `area:${key}`),
        ];

        const savedOrder: string[] = JSON.parse(
            localStorage.getItem("sidebarOrder") || "[]"
        );

        const updatedOrder = [
            ...savedOrder.filter((id) => pinnedIds.includes(id)),
            ...pinnedIds.filter((id) => !savedOrder.includes(id)),
        ];

        setSidebarApps(savedApps);
        setSidebarAreas(savedAreas);
        setSidebarOrder(updatedOrder);

        localStorage.setItem(
            "sidebarOrder",
            JSON.stringify(updatedOrder)
        );
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

    const sidebarEntries: SidebarEntry[] = sidebarOrder
        .map((id): SidebarEntry | null => {
            if (id.startsWith("app:")) {
                const code = id.slice(4);

                const app = allApps.find(
                    (item) => item.code === code
                );

                if (!app || !sidebarApps.includes(code)) {
                    return null;
                }

                return {
                    id,
                    type: "app",
                    appCode: app.code,
                    code: app.code,
                    name: app.name,
                };
            }

            if (id.startsWith("area:")) {
                const areaKey = id.slice(5);
                const [appCode, areaCode] = areaKey.split("|");

                const app = allApps.find(
                    (item) => item.code === appCode
                );

                const area = app?.functionalAreas.find(
                    (item) => item.code === areaCode
                );

                if (!app || !area || !sidebarAreas.includes(areaKey)) {
                    return null;
                }

                return {
                    id,
                    type: "area",
                    appCode: app.code,
                    code: area.code,
                    name: area.name,
                    appName: app.name,
                    url: area.url,
                };
            }

            return null;
        })
        .filter((item): item is SidebarEntry => item !== null);

    const handleDrop = (event: React.DragEvent,targetId: string) => {
        event.preventDefault();

        const sourceId =
            event.dataTransfer.getData("text/plain") ||
            draggedItem;

        if (!sourceId || sourceId === targetId) {
            setDraggedItem(null);
            return;
        }

        const currentOrder = sidebarEntries.map(
            (item) => item.id
        );

        const sourceIndex = currentOrder.indexOf(sourceId);
        const targetIndex = currentOrder.indexOf(targetId);

        if (sourceIndex === -1 || targetIndex === -1) {
            setDraggedItem(null);
            return;
        }

        const updatedOrder = [...currentOrder];

        updatedOrder.splice(sourceIndex, 1);
        updatedOrder.splice(targetIndex, 0, sourceId);

        setSidebarOrder(updatedOrder);

        localStorage.setItem(
            "sidebarOrder",
            JSON.stringify(updatedOrder)
        );

        setDraggedItem(null);
    };


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
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        },
    }}
        >
            {/* MAIN MENU */}

            <List
                sx={{
                    pt: 1,
                }}
            >
                
                {mainMenu.map((item) => {
                    const selected =
                        location.pathname === item.path ||
                        location.pathname.startsWith(`${item.path}/`) ||
                        (item.path === "/apps" &&
                            location.pathname.startsWith("/apps/"));
                    return (
                    <ListItem
                        key={item.name}
                        disablePadding
                        sx={{
                            display: "block",
                        }}>
                         
                        <ListItemButton
                            onClick={() => navigate(item.path)}
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
                                    backgroundColor: "#f3f7fc",
                                },

                                "&.Mui-selected": {
                                    backgroundColor: "#e5effc",
                                },

                                "&.Mui-selected:hover": {
                                    backgroundColor: "#dceafb",
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
                                        fontWeight: selected
                                            ? 800
                                            : 400,
                                        color: selected
                                            ? "var(--blue)"
                                            : "var(--sidetext)",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    )
            })}
            </List>           

            {/* MY APPS */}

    {open && sidebarEntries.length > 0 && (
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

       <Box
    sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",

        "&::-webkit-scrollbar": {
            width: "5px",
        },

        "&::-webkit-scrollbar-track": {
            background: "transparent",
        },

        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c5cfda",
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#9eacba",
        },

        scrollbarWidth: "thin",
        scrollbarColor: "#c5cfda transparent",
    }}
>
    {/* MY APPS */}

    {sidebarEntries.length > 0 && (
        <List sx={{ pt: 0 }}>
            {sidebarEntries.map((item) => {
               const selected =
                    item.type === "app"
                        ? location.pathname === `/apps/${item.appCode}` || location.pathname.startsWith(`/apps/${item.appCode}/`)
                        : location.pathname ===`/apps/${item.appCode}/${item.code}`;
                return (
                    <ListItem
                        key={item.id}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <CustomTooltip
                            title={
                                item.type === "area"
                                    ? `${item.appName} · ${item.name}`
                                    : item.name
                            }
                        >
                            <ListItemButton
                                draggable
                                onDragStart={(event) => {
                                    setDraggedItem(item.id);
                                
                                    event.dataTransfer.setData(
                                        "text/plain",
                                        item.id
                                    );
                                
                                    event.dataTransfer.effectAllowed =
                                        "move";
                                }}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                
                                    event.dataTransfer.dropEffect =
                                        "move";
                                }}
                                onDrop={(event) =>
                                    handleDrop(event, item.id)
                                }
                                onDragEnd={() => setDraggedItem(null)}
                                onClick={() => {
                                    if (item.type === "app") {
                                        navigate(`/apps/${item.appCode}`);
                                    } else if (item.url) {
                                        window.open(
                                            item.url,
                                            "_blank"
                                        );
                                    }
                                }}
                                selected={selected}
                                sx={{
                                    minHeight: 42,
                                    px: open ? 2 : 0,
                                    mx: open ? 1 : 0,
                                    borderRadius: "7px",
                                    justifyContent: open
                                        ? "initial"
                                        : "center",
                                    opacity:
                                        draggedItem === item.id
                                            ? 0.4
                                            : 1,
                                    cursor: "grab",
                                    "&:active": {
                                        cursor: "grabbing",
                                    },
                                    "&:hover": {
                                        backgroundColor: "#f3f7fc",
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: "#e5effc",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 24,
                                        width: 24,
                                        height: 24,
                                        mr: open ? 2 : 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: selected
                                            ? "var(--blue)"
                                            : "var(--sidetext)",
                                        "& svg": {
                                            fontSize: 17,
                                        },
                                    }}
                                >
                                    <AppsOutlinedIcon />
                                </ListItemIcon>
                                
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        open && item.type === "area"
                                            ? item.appName
                                            : undefined
                                    }
                                    sx={{
                                        display: open ? "block" : "none",
                                        "& .MuiTypography-root": {
                                            fontSize: "11px",
                                            fontWeight: selected ? 800 : 400,
                                            color: selected
                                                ? "var(--blue)"
                                                : "var(--sidetext)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        },
                                        "& .MuiListItemText-secondary": {
                                            fontSize: "9px",
                                            color: "#8a9bad",
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </CustomTooltip>
                    </ListItem>
                );
            })}
        </List>
    )}
</Box>

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