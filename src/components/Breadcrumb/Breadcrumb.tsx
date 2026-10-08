import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { appsData } from "../../data/appsData";

const routeNames: { [key: string]: string } = {
    "portfolio-performance": "Portfolio Performance",
    "project-performance": "Project Performance",
    "commercial-performance": "Commercial Performance",
    "operational-analysis": "Operational Analysis",
    "EPCPROMAN-AI": "EPCROMAN - AI",
    "scrum-board": "Scrum Board",
    "calendar": "Calendar",
    "time-sheet": "Time Sheet",
    "recent": "Recent",
    "for-you": "For You",
    "starred": "Starred",
    "apps": "Apps",
};

export default function Breadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);

    const appCode = parts[1];
    const areaCode = parts[2];

    const app = appsData
        .flatMap((section) => section.apps)
        .find((item) => item.code === appCode);

    const area = app?.functionalAreas.find(
        (item) => item.code === areaCode
    );

    const breadcrumbs: {
        label: string;
        path?: string;
    }[] = [];

    if (path === "/" || path === "/apps") {
        breadcrumbs.push({
            label: "Apps",
            path: "/apps",
        });
    } else if (path.startsWith("/apps/")) {
        breadcrumbs.push({
            label: "Apps",
            path: "/apps",
        });

        if (app) {
            breadcrumbs.push({
                label: app.productCode,
                path: `/apps/${app.productCode}`,
            });
        }

        if (area) {
            breadcrumbs.push({
                label: area.name,
            });
        }
    } else {
        const routeName = routeNames[parts[0]];

        if (routeName) {
            breadcrumbs.push({
                label: routeName,
            });
        }
    }

    return (
        <Box
            sx={{
                height: 40,
                display: "flex",
                alignItems: "center",
                px: 3,
                gap: 1,
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e1e7ef",
            }}
        >
            {breadcrumbs.map((item, index) => (
                <Box
                    key={`${item.label}-${index}`}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {index > 0 && (
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "var(--gray)",
                            }}
                        >
                            /
                        </Typography>
                    )}

                    <Typography
                        onClick={() => {
                            if (item.path) {
                                navigate(item.path);
                            }
                        }}
                        sx={{
                            fontSize: 14,
                            fontWeight:
                                index === breadcrumbs.length - 1
                                    ? 800
                                    : 600,
                            color:
                                index === breadcrumbs.length - 1
                                    ? "var(--navy)"
                                    : "var(--blue)",
                            cursor: item.path
                                ? "pointer"
                                : "default",
                            "&:hover": item.path
                                ? {
                                      textDecoration: "underline",
                                      backgroundColor: "#f4f7fb",
                                  }
                                : {},
                        }}
                    >
                        {item.label}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}