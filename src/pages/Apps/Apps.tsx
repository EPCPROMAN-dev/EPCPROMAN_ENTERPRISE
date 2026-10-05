import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppCard from "../../components/Apps/AppCard";
import { appsData } from "../../data/appsData";

const coreProjectApps = appsData[0].apps;
const businessApps = appsData[1].apps;
const digitalizationApps = appsData[2].apps;

export default function Apps() {
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {/* Apps Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff",
                        border: "1px solid #dce3eb",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: 1.2,
                                color: "#1769d2",
                            }}
                        >
                            ENTERPRISE PORTFOLIO
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 28,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Apps
                        </Typography>
                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 13,
                                color: "#718096",
                            }}
                        >
                            Navigate from the EPCPROMAN portfolio into
                            module-level functional areas.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 120,
                            height: 76,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #cbdcf2",
                            borderRadius: 2,
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 26,
                                fontWeight: 700,
                                lineHeight: 1,
                                color: "#1769d2",
                            }}
                        >
                            21
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 8,
                                color: "#7b8ba1",
                            }}
                        >
                            Portfolio Apps
                        </Typography>
                    </Box>
                </Box>

                {/* Core Project Apps */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Core Project Apps
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 9,
                                color: "#7b8ba1",
                            }}
                        >
                            01–09 · Core EPC lifecycle applications
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
                        {coreProjectApps.map((app, index) => (
                            <AppCard
                                key={app.code}
                                number={index + 1}
                                code={app.code}
                                name={app.name}
                                status={app.status}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Business Apps */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Business Apps
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 9,
                                color: "#7b8ba1",
                            }}
                        >
                            10 applications
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
                        {businessApps.map((app, index) => (
                            <AppCard
                                key={app.code}
                                number={
                                    coreProjectApps.length + index + 1
                                }
                                code={app.code}
                                name={app.name}
                                status={app.status}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Digitalization */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#123565",
                            }}
                        >
                            Digitalization
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 9,
                                color: "#7b8ba1",
                            }}
                        >
                            2 applications
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
                        {digitalizationApps.map((app, index) => (
                            <AppCard
                                key={app.code}
                                number={
                                    coreProjectApps.length +
                                    businessApps.length +
                                    index +
                                    1
                                }
                                code={app.code}
                                name={app.name}
                                status={app.status}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}