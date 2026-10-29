import FilterBar from "../../components/Common/FilterBar/FilterBar";
import Chart from "../../components/Charts/Chart";
import DataTable from "../../components/Common/DataTable/DataTable";
import GlobalProjectDashboard from "./components/GlobalProjectDashboard/GlobalProjectDashboard";
import CardGrid from "../../components/Common/CardDesign/CardGrid/CardGrid";

import { useState } from "react"
import { Box, Typography } from "@mui/material";
// import WHAMS from "../Whams/whams";"./components/GlobalProjectDashboard/GlobalProjectDashboard";
function Dashboard01() {
    const initialFilterValues: { [key: string]: string | string[] } = {};
    //   const [division, setDivision] = useState("all");
    // const [location, setLocation] = useState("all");
    // const [projectType, setProjectType] = useState("all");
    // const [status, setStatus] = useState("all");





    //     function handleFilterChange(field: string, value: string) {
    //     if (field === "division") {
    //         setDivision(value);
    //     }

    //     if (field === "location") {
    //         setLocation(value);
    //     }

    //     if (field === "projectType") {
    //         setProjectType(value);
    //     }

    //     if (field === "status") {
    //         setStatus(value);
    //     }




    // }

    const gridData = [
        {
            project: "Project A",
            location: "Mumbai",
            status: "Ongoing",
            value: 30,
        },
        {
            project: "Project B",
            location: "Delhi",
            status: "Completed",
            value: 45,
        },
        {
            project: "Project C",
            location: "Mumbai",
            status: "Ongoing",
            value: 60,
        },
    ];

    const gridColumns = [
        {
            field: "project",
            title: "Project",
        },
        {
            field: "location",
            title: "Location",
        },
        {
            field: "status",
            title: "Status",
        },
        {
            field: "value",
            title: "Value",
        },
    ];

    const chartData = [
        {
            month: "Jan",
            sales: 30,
            expense: 20,
        },
        {
            month: "Feb",
            sales: 45,
            expense: 30,
        },
        {
            month: "Mar",
            sales: 60,
            expense: 40,
        },
        {
            month: "Apr",
            sales: 50,
            expense: 35,
        },
    ];

    const detailData = [
        {
            project: "Project A",
            location: "Mumbai",
            status: "Ongoing",
            value: 30,
        },
        {
            project: "Project B",
            location: "Delhi",
            status: "Completed",
            value: 45,
        },
        {
            project: "Project C",
            location: "Mumbai",
            status: "Ongoing",
            value: 60,
        },
    ];

    const detailColumns = [
        {
            field: "project",
            title: "Project",
        },
        {
            field: "location",
            title: "Location",
        },
        {
            field: "status",
            title: "Status",
        },
        {
            field: "value",
            title: "Value",
        },
    ];

    const cardData = [
        {
            title: "Total Projects",
            value: "111",
            valueIcon: null,
            subtitle: null,
            icon: null,
            iconBackground: "#e9f7f5",
            subCard: [
                {
                    label: "Ongoing",
                    value: "58"
                },
                {
                    label: "Upcoming",
                    value: "37"
                },
                {
                    label: "Completed",
                    value: "16"
                }
            ],
            bTColor: "#119b91"
        },
        {
            title: "Cost",
            value: "₹3,96,499 Cr",
            valueIcon: null,
            subtitle: null,
            icon: null,
            iconBackground: "#e9f7f5",
            subCard: [
                {
                    label: "Ongoing",
                    value: "₹2,16,739 Cr"
                },
                {
                    label: "Upcoming",
                    value: "₹1,22,438 Cr"
                },
                {
                    label: "Completed",
                    value: "₹57,322 Cr"
                }
            ],
            bTColor: "#df7a00"
        },
        {
            title: "Expenditure",
            value: "",
            valueIcon: null,
            subtitle: null,
            icon: null,
            iconBackground: "#e9f7f5",
            subCard: [
                {
                    label: "Cumulative Commitment",
                    value: "₹1,02,519 Cr"
                },
                {
                    label: "Cumulative Expenditure",
                    value: "₹1,39,271 Cr"
                },
                {
                    label: "FY Budget",
                    value: "₹3,64,779 Cr"
                },
                {
                    label: "FY Expenditure",
                    value: "₹1,16,988 Cr"
                }
            ],
            bTColor: "#1769c2"
        },
        {
            title: "Overrun Projects",
            value: "35",
            valueIcon: null,
            subtitle: null,
            icon: null,
            iconBackground: "#e9f7f5",
            subCard: [
                {
                    label: "Time Overrun",
                    value: "24"
                },
                {
                    label: "Cost Overrun",
                    value: "11"
                }
            ],
            bTColor: "#df7a00"
        },


    ]

    function handleFilterChange(field: string, value: string | string[]) {
        setFilterValues({
            ...filterValues,
            [field]: value,
        });
    }



    function handleReset() {
        setFilterValues(initialFilterValues);
    }







    const filters = [
        {
            field: "division",
            label: "Project Division",
            type: "dropdown",
            options: [
                { label: "All", value: "all" },
                { label: "Division A", value: "division-a" },
                { label: "Division B", value: "division-b" },
                { label: "Division C", value: "division-c" },
                { label: "Division D", value: "division-d" },
                { label: "Division E", value: "division-e" },
                { label: "Division G", value: "division-g" },
            ],
            defaultValue: "all",
        },
        {
            field: "location",
            label: "Project Location",
            type: "dropdown",
            options: [
                { label: "All", value: "all" },
                { label: "Mumbai", value: "mumbai" },
                { label: "Delhi", value: "delhi" },
            ],
            defaultValue: "all",
        },
        {
            field: "projectType",
            label: "Project Type",
            type: "dropdown",
            options: [
                { label: "All", value: "all" },
                { label: "Residential", value: "residential" },
                { label: "Commercial", value: "commercial" },
            ],
            defaultValue: "all",
        },
        {
            field: "status",
            label: "Project Status",
            type: "multiselect",
            options: [
                { label: "Ongoing", value: "ongoing" },
                { label: "Completed", value: "completed" },
                { label: "Upcoming", value: "upcoming" },
            ],
            defaultValue: ["ongoing", "completed", "upcoming"],
        },
    ];




    filters.forEach((filter) => {
        initialFilterValues[filter.field] = filter.defaultValue;
    });

    const [filterValues, setFilterValues] = useState(initialFilterValues);


    return (
        <div>

            <Box sx={{ margin: "10px" }}>
                <FilterBar filters={filters} onFilterChange={handleFilterChange} filterValues={filterValues} onReset={handleReset} />

            </Box>

            <Box sx={{ margin: "10px" }}>
                <CardGrid cardDesign = {"cardDesign2"} data = {cardData} />

            </Box>

            <Box sx={{ margin: "10px" }}>
                <GlobalProjectDashboard />

            </Box>

            <Typography sx={{marginInline: "20px", marginBlock:"20px", fontWeight: "Bold"}} variant="subtitle1">
                DIVISION / LOCATION / PROJECT TYPE VIEW
            </Typography>


            <Box sx={{

                display: "flex",
                gap: "10px",
                margin: "10px"
            }}>

                <Chart
                    graphId="dashboard01-test"
                    title="Project Completion Forecast"
                    type="BarChart"
                    data={chartData}
                    additionalChartDetails={{
                        x: "month",
                        y: ["sales", "expense"],
                    }}
                    detailData={detailData}
                    detailColumns={detailColumns}
                    height={350}
                    width="50%"
                    wantWrapperHeader={true}
                    wantWrapperShadow={true}
                    changeChartOption={true}
                    detailOption={true}
                    showLegend={true}
                />

                <Chart
                    graphId="dashboard01-test"
                    title="Delayed Project Representation"
                    type="BarChart"
                    data={chartData}
                    additionalChartDetails={{
                        x: "month",
                        y: ["sales", "expense"],
                    }}
                    detailData={detailData}
                    detailColumns={detailColumns}
                    height={350}
                    width="50%"
                    wantWrapperHeader={true}
                    wantWrapperShadow={true}
                    changeChartOption={true}
                    detailOption={true}
                    showLegend={true}
                />


            </Box>


 <Typography sx={{marginInline: "20px", marginBlock:"20px", fontWeight: "Bold"}} variant="subtitle1">
                DIVISION / LOCATION / PROJECT TYPE VIEW
            </Typography>



            <Box sx={{

                margin: "10px"
            }}>

                <Chart
                    graphId="dashboard01-test"
                    title="Last 5 yrs. No. of Projects / Approved Cost"
                    type="BarChart"
                    data={chartData}
                    additionalChartDetails={{
                        x: "month",
                        y: ["sales", "expense"],
                    }}
                    detailData={detailData}
                    detailColumns={detailColumns}
                    height={350}
                    width="100%"
                    wantWrapperHeader={true}
                    wantWrapperShadow={true}
                    changeChartOption={true}
                    detailOption={true}
                    showLegend={true}
                />
            </Box>

            <Box sx={{

                margin: "10px"
            }}>

                <Chart
                    graphId="dashboard01-test"
                    title="Year-wise Financial Progress"
                    type="BarChart"
                    data={chartData}
                    additionalChartDetails={{
                        x: "month",
                        y: ["sales", "expense"],
                    }}
                    detailData={detailData}
                    detailColumns={detailColumns}
                    height={350}
                    width="100%"
                    wantWrapperHeader={true}
                    wantWrapperShadow={true}
                    changeChartOption={true}
                    detailOption={true}
                    showLegend={true}
                />

            </Box>



            <Box sx={{
                margin: "10px"
            }}>
                <div className="mt-6 h-80">
                    <DataTable
                        data={gridData}
                        columns={gridColumns}
                    />
                </div>

            </Box>




            {/* <WHAMS/> */}



        </div>
    );
}

export default Dashboard01;