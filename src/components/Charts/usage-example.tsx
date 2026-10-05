import Chart from "./Chart";

function DashboardChartExample() {
    const data = [
        {
            month: "Jan",
            amount: 120,
        },
        {
            month: "Feb",
            amount: 180,
        },
        {
            month: "Mar",
            amount: 150,
        },
    ];

    // const propTextForm = {
    //     month: {
    //         type: "text" as const,
    //     },
    //     amount: {
    //         type: "value" as const,
    //     },
    // };

    return (
        <Chart
            graphId="project-progress"
            title="Project Progress"
            type="LineChart"
            data={data}
            // propTextForm={propTextForm}
            height={350}
            wantWrapperHeader={true}
            wantWrapperShadow={true}
            showLegend={false}
            changeChartOption={true}
            chartOptions={[
                "LineChart",
                "BarChart",
                "PieChart",
            ]}
            onDataBound={() => {
                console.log("Chart is ready");
            }}
            onClick={(event) => {
                console.log("Chart clicked", event);
            }}
        />
    );
}

export default DashboardChartExample;
