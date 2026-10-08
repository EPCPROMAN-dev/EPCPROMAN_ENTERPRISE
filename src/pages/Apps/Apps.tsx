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
                p: 2,
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
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        px: 3,
                        py: 2,
                        // box-shadow: 0 5px 18px rgba(10, 35, 70, .06);
                        boxShadow: "0px 5px 18px rgba(10, 35, 70, 0.06)",
                        
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 800,
                                letterSpacing: 1.1,
                                color: "var(--blue)",
                             textTransform: "uppercase",
                            }}
                        >
                            ENTERPRISE PORTFOLIO
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 28,
                                fontWeight: 700,
                                color: "var(--navy)",
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
                           width: 350,
                            height: 75,                                 
                            flexDirection: "column",                         
                            justifyContent: "center",
                            border: "1px solid var(--border)",
                            borderRadius: 3,
                            flexShrink: 0,
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            columnGap: 2,
                            alignItems: "center",
                            px: 1.5,
                             backgroundColor: "var(--bluebg)",
                             boxSizing: "border-box",
                        }}
                    >
                        <Box> 
                            <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "var(--muted)",
                               LetterSpacing: 1.1,
                            }}
                        >
                            CURRENT PLAN
                        </Typography>

                        <Typography
                            sx={{
                               
                                fontSize: 15,
                                fontWeight: 800,
                                color: "var(--navy)",
                            }}
                        >
                            ENTERPRISE
                        </Typography>
                         <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 10,
                                color: "#7b8ba1",
                            }}
                        >
                            No-adds on active
                        </Typography>
                        </Box>
                       
                    <Box>
                         <Typography
                            sx={{
                                fontSize: 17,
                                color: "var(--blue)",
                                   fontWeight: 800,
                        lineHeight: 1.2,
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
                            <Box
                            sx={{
                               display: "flex",
                                alignItems: "end",
                                justifyContent: "space-between",
                                flexDirection: "row",
                }}>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 800,
                                        color: "var(--navy)", 
                                        ml: 2,             
                                    }}
                                >
                                    {plan.plan}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.3,
                                        fontSize: 11,
                                        color: "#474c52",
                                     ml:2,
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