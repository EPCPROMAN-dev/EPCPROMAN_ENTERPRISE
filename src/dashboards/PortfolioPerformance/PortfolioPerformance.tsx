import FilterBar from "../../components/Common/FilterBar/FilterBar";
import Chart from "../../components/Charts/Chart";
import DataTable from "../../components/Common/DataTable/DataTable";
import GlobalProjectDashboard from "./components/GlobalProjectDashboard/GlobalProjectDashboard";

import { useState } from "react"
// import WHAMS from "../Whams/whams";
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
            <h1 className="mb-6 text-2xl font-bold">
                Dashboard 01
            </h1>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} filterValues={filterValues} onReset={handleReset} />

            {/*             <p>Division: {division}</p>
<p>Location: {location}</p>
<p>Project Type: {projectType}</p>
<p>Status: {status}</p> */}



            {/* <pre>{JSON.stringify(filterValues, null, 2)}</pre> */}

            <Chart
                graphId="dashboard01-test"
                title="Sales vs Expense"
                type="BarChart"
                data={chartData}
                additionalChartDetails={{
                    x: "month",
                    y: ["sales", "expense"],
                }}
                detailData={detailData}
                detailColumns={detailColumns}
                height={350}
                wantWrapperHeader={true}
                wantWrapperShadow={true}
                changeChartOption={true}
                detailOption={true}
                showLegend={true}
            />

            <div className="mt-6 h-80">
                <DataTable
                    data={gridData}
                    columns={gridColumns}
                />
            </div>

            <GlobalProjectDashboard />

            {/* <WHAMS/> */}



        </div>
    );
}

export default Dashboard01;