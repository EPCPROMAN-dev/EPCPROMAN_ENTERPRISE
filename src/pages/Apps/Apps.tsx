import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppCard from "../../components/Apps/AppCard";
import { appsData } from "../../data/appsData";
import { useState } from "react";

export default function Apps() {
    const [selectedApp, setSelectedApp] = useState<any>(null);

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
                        px: 3,
                        py: 2,
                        
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

                    {/* Current Plan */}
                    <Box
                        sx={{
                           width: 260,
                            height: 65,                                 
                            flexDirection: "column",                         
                            justifyContent: "center",
                            border: "1px solid #cbdcf2",
                            borderRadius: 2,
                            flexShrink: 0,
                            display: "grid",
gridTemplateColumns: "1fr auto",
columnGap: 2,
alignItems: "center",
px: 1.5,
                        }}
                    >
                        <Box> 
                            <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#7b8ba1",
                            }}
                        >
                            CURRENT PLAN
                        </Typography>

                        <Typography
                            sx={{
                               
                                fontSize: 15,
                                fontWeight: 800,
                                color: "#172f66",
                            }}
                        >
                            ENTERPRISE
                        </Typography>
                         <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 8,
                                color: "#7b8ba1",
                            }}
                        >
                            No-adds on active
                        </Typography>
                        </Box>
                       
                    <Box>
                         <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 14,
                                color: "#1769d2",
                                   fontWeight: 800,
                            }}
                        >
                            23/25 
                       
                        </Typography>
                        
                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 8,
                                color: "#7b8ba1",
                            }}
                        >
                            Apps enabled
                        </Typography>
                    </Box>
                       

                    </Box>

                </Box>

                {/* Plan Sections */}
                {appsData.map((plan) => (
                    <Box key={plan.plan}>
                        {/* Plan Header */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1.5,
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: "#123565",
                                    }}
                                >
                                    {plan.plan}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.3,
                                        fontSize: 10,
                                        color: "#7b8ba1",
                                    }}
                                >
                                    {plan.description}
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: 9,
                                    color: "#7b8ba1",
                                }}
                            >
                                {plan.range} · {plan.moduleCount} modules
                            </Typography>
                        </Box>

                        {/* Apps Grid */}
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
                            {plan.apps.map((app, index) => (
                               <AppCard
                                    key={app.code}
                                    number={index + 1}
                                    code={app.code}
                                    productCode={app.productCode}
                                    name={app.name}
                                    status={
                                        app.licenseRequired
                                            ? "Add-on license required"
                                            : app.status
                                    }
                                    available={app.available}
                                    licenseRequired={app.licenseRequired}
                                    onLicenseRequired={() =>
                                        setSelectedApp(app)
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}