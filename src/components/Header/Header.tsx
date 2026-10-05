import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

interface HeaderProps {
    open: boolean;
    handleDrawerToggle: () => void;
}

export default function Header({ open, handleDrawerToggle }: HeaderProps) {
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
    const [profileOpen, setProfileOpen] = React.useState<boolean>(false);

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setSearchValue(value);
        setSearchOpen(value.length > 0);
    };

    const handleSearchFocus = () => {
        if (searchValue.length > 0) {
            setSearchOpen(true);
        }
    };

    const handleSearchClose = () => {
        setSearchOpen(false);
    };

    const handleProfileClick = () => {
        setProfileOpen((prev) => !prev);
    };

    const handleProfileClose = () => {
        setProfileOpen(false);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#ffffff",
                color: "#12345b",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
                zIndex: 1300,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "64px !important",
                    px: {
                        xs: 1.5,
                        sm: 2,
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                    position: "relative",
                }}
            >
                {/* SIDEBAR TOGGLE */}
                <IconButton
                    onClick={handleDrawerToggle}
                    aria-label={open ? "close sidebar" : "open sidebar"}
                    sx={{
                        width: 36,
                        height: 36,
                        mr: 2,
                        color: "#12345b",
                        borderRadius: "6px",
                        flexShrink: 0,
                        "&:hover": {
                            backgroundColor: "#eef4fa",
                        },
                    }}
                >
                    {open ? (
                        <ChevronLeftIcon fontSize="small" />
                    ) : (
                        <MenuIcon fontSize="small" />
                    )}
                </IconButton>
                {/* COMPANY NAME */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: {
                            xs: 170,
                            sm: 245,
                        },
                        minWidth: 0,
                        flexShrink: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "17px",
                                sm: "20px",
                            },
                            fontWeight: 700,
                            letterSpacing: "1px",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                        }}
                    >
                        EPCPROMAN
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "7px",
                            letterSpacing: "2px",
                            color: "#7b91a8",
                            mt: 0.7,
                            whiteSpace: "nowrap",
                        }}
                    >
                        ENTERPRISE SOFTWARE PLATFORM
                    </Typography>
                </Box>
               
                {/* SEARCH */}
                <ClickAwayListener onClickAway={handleSearchClose}>
                    <Box
                        sx={{
                            position: "relative",
                            width: {
                                xs: 170,
                                sm: 220,
                                md: 300,
                            },
                            flexShrink: 1,

                            ml:"auto",
                            mr: {
                                xs: 1,
                                sm: 2,
                            },
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            value={searchValue}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            placeholder="Search modules or functions..."
                            autoComplete="off"
                           slotProps={{
    input: {
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon
                    sx={{
                        fontSize: 17,
                        color: "#7b91a8",
                    }}
                />
            </InputAdornment>
        ),
    },
}}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 38,
                                    borderRadius: "8px",
                                    backgroundColor: "#ffffff",
                                    fontSize: "10px",
                                    "& fieldset": {
                                        borderColor: "#d5dfeb",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#b8c9db",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#1976d2",
                                        borderWidth: 2,
                                    },
                                },
                                "& input": {
                                    padding: "8px 8px",
                                    fontSize: "10px",
                                },
                                "& input::placeholder": {
                                    color: "#718096",
                                    opacity: 1,
                                },
                            }}
                        />
                        {/* SEARCH DROPDOWN */}
                        {searchOpen && (
                            <Paper
                                elevation={4}
                                sx={{
                                    position: "absolute",
                                    top: "43px",
                                    left: 0,
                                    width: "100%",
                                    borderRadius: "10px",
                                    border: "1px solid #e1e7ef",
                                    overflow: "hidden",
                                    zIndex: 1500,
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 1.5,
                                        py: 1.5,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "10px",
                                            color: "#718096",
                                        }}
                                    >
                                        No matching modules or functions found.
                                    </Typography>
                                </Box>
                            </Paper>
                        )}
                    </Box>
                </ClickAwayListener>
                {/* USER PROFILE */}
                <ClickAwayListener onClickAway={handleProfileClose}>
                    <Box
                        sx={{
                            position: "relative",
                            flexShrink: 0,
                        }}
                    >
                        {/* USER BUTTON */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {/* AVATAR */}
                            <Badge
                                badgeContent={10}
                                color="error"
                                overlap="circular"
                                sx={{
                                    "& .MuiBadge-badge": {
                                        fontSize: "7px",
                                        fontWeight: 700,
                                        minWidth: 15,
                                        height: 15,
                                        padding: 0,
                                    },
                                }}
                            >
                                <Avatar
                                    onClick={handleProfileClick}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        backgroundColor: "#eaf2ff",
                                        color: "#1565c0",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        border: profileOpen
                                            ? "2px solid #1976d2"
                                            : "none",
                                        "&:hover": {
                                            backgroundColor: "#dceaff",
                                        },
                                    }}
                                >
                                    AK
                                </Avatar>
                            </Badge>
                            {/* ADMINISTRATOR */}
                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    color: "#1f2937",
                                    whiteSpace: "nowrap",
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                    },
                                }}
                            >
                                Administrator
                            </Typography>
                        </Box>
                        {/* PROFILE POPUP */}
                        {profileOpen && (
                            <Paper
                                elevation={5}
                                sx={{
                                    position: "absolute",
                                    top: "48px",
                                    right: 0,
                                    width: {
                                        xs: 280,
                                        sm: 300,
                                    },
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                    border: "1px solid #e1e7ef",
                                    backgroundColor: "#ffffff",
                                    zIndex: 1600,
                                }}
                            >
                                {/* PROFILE HEADER */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        px: 2,
                                        py: 2,
                                        backgroundColor: "#f8fbff",
                                    }}
                                >
                                    {/* PROFILE ICON */}
                                    <Avatar
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: "#ffffff",
                                            color: "#1565c0",
                                            border: "1px solid #d7e5f5",
                                        }}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                    {/* USER INFO */}
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                                color: "#12345b",
                                            }}
                                        >
                                            Amol
                                            <br />
                                            Kurkute
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#718096",
                                                mt: 0.5,
                                            }}
                                        >
                                            Administrator
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                {/* MENU */}
                                <List disablePadding>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 46,
                                            px: 2.5,
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#263b55",
                                            borderBottom:
                                                "1px solid #edf1f5",
                                        }}
                                    >
                                        My Profile
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 46,
                                            px: 2.5,
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#263b55",
                                            borderBottom:
                                                "1px solid #edf1f5",
                                        }}
                                    >
                                        Manage Account
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 46,
                                            px: 2.5,
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#263b55",
                                            borderBottom:
                                                "1px solid #edf1f5",
                                        }}
                                    >
                                        Personalization
                                    </ListItemButton>
                                    {/* NOTIFICATIONS */}
                                    <ListItemButton
                                        sx={{
                                            minHeight: 46,
                                            px: 2.5,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#263b55",
                                            borderBottom:
                                                "1px solid #edf1f5",
                                        }}
                                    >
                                        Notifications
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: "50%",
                                                backgroundColor: "#ff3030",
                                                color: "#ffffff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "9px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            10
                                        </Box>
                                    </ListItemButton>
                                    {/* SIGN OUT */}
                                    <ListItemButton
                                        sx={{
                                            minHeight: 46,
                                            px: 2.5,
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#263b55",
                                        }}
                                    >
                                        Sign Out
                                    </ListItemButton>
                                </List>
                            </Paper>
                        )}
                    </Box>
                </ClickAwayListener>
            </Toolbar>
        </AppBar>
    );
}

