import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

const navigationItems = [
    {
        name: "Scrum Board",
        path: "/scrum-board",
    },
    {
        name: "Portfolio Performance",
        path: "/portfolio-performance",
    },
    {
        name: "Project Performance",
        path: "/project-performance",
    },
    {
        name: "Commercial Performance",
        path: "/commercial-performance",
    },
    {
        name: "Operational Analysis",
        path: "/operational-analysis",
    },
    {
        name: "PROAI",
        path: "/EPCPROMAN-AI",
    },
];

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box
            sx={{
                height: 48,
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #dce3eb",
                overflowX: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                gap: 0.5,
            }}
        >
            {navigationItems.map((item) => {
                const selected = location.pathname === item.path;

                return (
                    <ButtonBase
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        sx={{
                            height: "100%",
                            px: 4,
                            position: "relative",
                            flexShrink: 0,
                            fontSize: "14px",
                            fontWeight: selected ? 800 : 700,
                            color: selected ? "var(--navy)" : "var(--gray)",
                            "&:hover": {
                                backgroundColor: "#f5f8fc",
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: 12,
                                right: 12,
                                height: 2,
                                backgroundColor: selected
                                    ? "var(--blue)"
                                    : "transparent",
                            },
                        }}
                    >
                        {item.name}
                    </ButtonBase>
                );
            })}
        </Box>
    );
}

export default NavBar;