import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import type { CSSProperties, ReactNode } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import DataTable from "../Common/DataTable/DataTable";

import {
    prepareChartData,
    type PreparedChartData,
} from "./chartData";

import {
    getSavedChartType,
    saveChartType,
} from "./chartStorage";

import type {
    ChartDataItem,
    ChartHandle,
    ChartProps,
    ChartType,
} from "./chart.types";

import "./Chart.css";

type ChartInstance =
    | am4charts.PieChart
    | am4charts.XYChart
    | am4charts.PieChart3D
    | am4charts.SlicedChart
    | am4charts.TreeMap;

const defaultChartOptions: ChartType[] = [
    "PieChart",
    "BarChart",
    "LineChart",
    "SemiPieChart",
    "ThreeDPieChart",
    "DonutChart",
    "FunnelChart",
    "InnerThreeDPieChart",
    "DoubleDonutChart",
    "DonutCumPieChart",
    "SimpleBarChart",
    "DoubleBarChart",
    "TreeMapChart",
];

function toCssSize(value: string | number | undefined): string | undefined {
    if (typeof value === "number") {
        return `${value}px`;
    }

    return value;
}

function createChart(
    elementId: string | HTMLElement,
    type: ChartType,
    prepared: PreparedChartData,
    props: ChartProps
): ChartInstance {
    am4core.useTheme(am4themes_animated);

    switch (type) {
        case "PieChart": {
            const chart = am4core.create(elementId, am4charts.PieChart);
            chart.data = prepared.data;
            chart.radius = am4core.percent(100);

            if (prepared.multiSeries) {
                createPieMultiSeries(chart, prepared);
            } else {
                const series = chart.series.push(new am4charts.PieSeries());
                series.dataFields.value = "propValue";
                series.dataFields.category = "propText";
                series.radius = am4core.percent(70);
                series.labels.template.disabled = true;
                series.ticks.template.disabled = true;
            }

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "BarChart": {
            const chart = am4core.create(elementId, am4charts.XYChart);
            chart.data = prepared.data;

            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();

            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "propText";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.rotation = 280;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minHeight = 0;

            if (prepared.multiSeries) {
                createBarMultiSeries(
                    chart,
                    prepared,
                    props.additionalChartDetails?.y
                );
            } else {
                createColumnSeries(chart, "propValue", "Value");
            }

            addLegend(chart, props.showLegend);
            chart.cursor = new am4charts.XYCursor();
            chart.responsive.enabled = true;
            return chart;
        }

        case "HorizontalBarChart": {
            const chart = am4core.create(elementId, am4charts.XYChart);
            chart.data = prepared.data;

            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();

            const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "propText";
            categoryAxis.renderer.inversed = true;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.maxWidth = 120;
            categoryAxis.renderer.labels.template.wrap = true;

            chart.xAxes.push(new am4charts.ValueAxis());

            if (prepared.multiSeries) {
                const firstItem = prepared.data[0];
                const seriesCount = Number(firstItem?.seriesCount || 0);

                for (let index = 1; index <= seriesCount; index += 1) {
                    const series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.valueX = `propValueSeries_${index}`;
                    series.dataFields.categoryY = "propText";
                    series.name =
                        props.additionalChartDetails?.y[index - 1] ||
                        `Series ${index}`;
                    series.tooltipText = "{categoryY}: {valueX}";
                }
            } else {
                const series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = "propVal";
                series.dataFields.categoryY = "propText";
                series.tooltipText = "{categoryY}: {valueX}";
            }

            addLegend(chart, props.showLegend);
            chart.cursor = new am4charts.XYCursor();
            chart.responsive.enabled = true;
            return chart;
        }

        case "LineChart": {
            const chart = am4core.create(elementId, am4charts.XYChart);
            chart.data = prepared.data;

            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();

            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "propText";

            if (props.additionalChartDetails) {
                categoryAxis.title.text = props.additionalChartDetails.x;
            }

            chart.yAxes.push(new am4charts.ValueAxis());

            if (prepared.multiSeries) {
                createLineMultiSeries(
                    chart,
                    prepared,
                    props.additionalChartDetails?.y
                );
                addLegend(chart, true);
            } else {
                const series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "propValue";
                series.dataFields.categoryX = "propText";
                series.strokeWidth = 5;
                series.tensionX = 0.8;
                series.tooltipText = "{propText}: [bold]{valueY}[/]";
            }

            chart.cursor = new am4charts.XYCursor();
            chart.responsive.enabled = true;
            return chart;
        }

        case "SemiPieChart": {
            const chart = am4core.create(elementId, am4charts.PieChart);
            chart.data = prepared.data;
            chart.hiddenState.properties.opacity = 0;
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(30);
            chart.startAngle = 180;
            chart.endAngle = 360;

            const series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.category = "propText";
            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.alignLabels = false;
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;

            chart.legend = new am4charts.Legend();
            chart.responsive.enabled = true;
            return chart;
        }

        case "ThreeDPieChart": {
            const chart = am4core.create(elementId, am4charts.PieChart3D);
            chart.data = prepared.data;
            chart.radius = am4core.percent(60);
            chart.hiddenState.properties.opacity = 0;

            const series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.category = "propText";
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;

            addLegend(chart, props.showLegend);

            chart.responsive.enabled = true;
            return chart;
        }

        case "DonutChart": {
            const chart = am4core.create(elementId, am4charts.PieChart);
            chart.data = prepared.data;
            chart.radius = am4core.percent(80);
            chart.innerRadius = am4core.percent(60);

            const series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.category = "propText";
            series.slices.template.strokeWidth = 2;
            series.slices.template.strokeOpacity = 1;
            series.hiddenState.properties.opacity = 1;
            series.hiddenState.properties.endAngle = -90;
            series.hiddenState.properties.startAngle = -90;
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "FunnelChart": {
            const chart = am4core.create(elementId, am4charts.SlicedChart);
            chart.data = prepared.data;
            chart.hiddenState.properties.opacity = 0;

            const series = chart.series.push(new am4charts.FunnelSeries());
            series.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.category = "propText";
            series.alignLabels = true;
            series.labelsContainer.paddingLeft = 15;
            series.labelsContainer.width = 200;

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "InnerThreeDPieChart": {
            const chart = am4core.create(elementId, am4charts.PieChart3D);
            chart.data = prepared.data;
            chart.hiddenState.properties.opacity = 0;
            chart.innerRadius = am4core.percent(60);
            chart.radius = am4core.percent(30);
            chart.depth = 40;

            const series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.category = "propText";
            series.slices.template.cornerRadius = 5;
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.colors.step = 3;

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "DoubleDonutChart": {
            const chart = am4core.create(elementId, am4charts.PieChart3D);
            chart.data = prepared.data;
            chart.innerRadius = am4core.percent(40);

            const innerSeries = chart.series.push(
                new am4charts.PieSeries3D()
            );
            innerSeries.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            innerSeries.dataFields.category = "propText";
            innerSeries.innerRadius = am4core.percent(70);
            innerSeries.radius = am4core.percent(10);
            innerSeries.labels.template.disabled = true;
            innerSeries.ticks.template.disabled = true;

            const outerSeries = chart.series.push(
                new am4charts.PieSeries3D()
            );
            outerSeries.dataFields.value = "value";
            outerSeries.dataFields.category = "category";
            outerSeries.data = [
                {
                    category: "Total",
                    value: prepared.totalValue,
                },
            ];
            outerSeries.innerRadius = am4core.percent(120);
            outerSeries.radius = am4core.percent(75);
            outerSeries.labels.template.disabled = true;
            outerSeries.ticks.template.disabled = true;

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "DonutCumPieChart": {
            const chart = am4core.create(elementId, am4charts.PieChart);
            chart.data = prepared.data;

            const innerSeries = chart.series.push(new am4charts.PieSeries());
            innerSeries.dataFields.category = "propText";
            innerSeries.dataFields.value = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            innerSeries.radius = am4core.percent(82);
            innerSeries.ticks.template.disabled = true;
            innerSeries.labels.template.disabled = true;

            const outerSeries = chart.series.push(new am4charts.PieSeries());
            outerSeries.data = [
                {
                    category: "Total",
                    value: prepared.totalValue,
                },
            ];
            outerSeries.dataFields.value = "value";
            outerSeries.dataFields.category = "category";
            outerSeries.innerRadius = am4core.percent(85);
            outerSeries.radius = am4core.percent(110);
            outerSeries.labels.template.disabled = true;
            outerSeries.ticks.template.disabled = true;
            outerSeries.slices.template.fill = am4core.color("orange");
            outerSeries.zIndex = -1;

            addLegend(chart, props.showLegend);
            chart.responsive.enabled = true;
            return chart;
        }

        case "SimpleBarChart": {
            const chart = am4core.create(elementId, am4charts.XYChart);
            chart.data = prepared.data;

            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "propText";
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.wrap = true;
            categoryAxis.renderer.labels.template.maxWidth = 105;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.renderer.grid.template.disabled = true;

            const series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";
            series.dataFields.categoryX = "propText";
            series.columns.template.tooltipText =
                "{propText} [bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;

            const labelBullet = series.bullets.push(
                new am4charts.LabelBullet()
            );
            labelBullet.label.text = "{valueY}";
            labelBullet.label.dy = -10;
            labelBullet.label.fontSize = 14;

            addLegend(chart, props.showLegend);

            // chart.scrollbarX = undefined;
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "none";
            chart.responsive.enabled = true;
            return chart;
        }

        case "DoubleBarChart": {
            const chart = am4core.create(elementId, am4charts.XYChart);
            chart.data = prepared.data;

            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();

            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "propText";
            categoryAxis.renderer.labels.template.wrap = true;
            categoryAxis.renderer.labels.template.fontSize = 12;
            categoryAxis.renderer.labels.template.maxWidth = 150;
            categoryAxis.renderer.cellStartLocation = 0.1;
            categoryAxis.renderer.cellEndLocation = 0.8;

            chart.yAxes.push(new am4charts.ValueAxis());

            if (prepared.multiSeries) {
                createBarMultiSeries(
                    chart,
                    prepared,
                    props.additionalChartDetails?.y
                );
                addLegend(chart, true);
            } else {
                createColumnSeries(chart, "propValue", "Value");
            }

            chart.cursor = new am4charts.XYCursor();
            chart.responsive.enabled = true;
            return chart;
        }

        case "TreeMapChart": {
            const chart = am4core.create(elementId, am4charts.TreeMap);
            chart.data = prepared.data;
            chart.colors.step = 2;

            const valueField = prepared.multiSeries
                ? "propValueSeries_1"
                : "propValue";

            chart.dataFields.value = valueField;
            chart.dataFields.name = "propText";

            const level1 = chart.seriesTemplates.create("0");
            const column = level1.columns.template;
            column.fillOpacity = 0.8;
            column.strokeWidth = 5;
            column.strokeOpacity = 1;
            column.tooltipText = `{propText} :{${valueField}}`;

            const bullet = level1.bullets.push(
                new am4charts.LabelBullet()
            );
            bullet.locationY = 0.5;
            bullet.locationX = 0.5;
            bullet.label.text = `{propText}, {${valueField}}`;
            bullet.label.fontSize = 16;
            bullet.label.truncate = true;
            bullet.label.maxWidth = 40;
            bullet.label.hideOversized = true;
            bullet.label.wrap = true;

            chart.responsive.enabled = true;
            return chart;
        }

        default:
            throw new Error(`Unsupported chart type: ${type}`);
    }
}

function createPieMultiSeries(
    chart: am4charts.PieChart,
    prepared: PreparedChartData
): void {
    const firstItem = prepared.data[0];

    if (!firstItem) {
        return;
    }

    const seriesCount = Number(firstItem.seriesCount || 0);

    for (let index = 1; index <= seriesCount; index += 1) {
        const series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = `propValueSeries_${index}`;
        series.dataFields.category = "propText";
        series.radius = am4core.percent(70);
        series.labels.template.disabled = true;
        series.ticks.template.disabled = true;
    }
}

function createBarMultiSeries(
    chart: am4charts.XYChart,
    prepared: PreparedChartData,
    names?: string[]
): void {
    const firstItem = prepared.data[0];

    if (!firstItem) {
        return;
    }

    const seriesCount = Number(firstItem.seriesCount || 0);

    for (let index = 1; index <= seriesCount; index += 1) {
        createColumnSeries(
            chart,
            `propValueSeries_${index}`,
            names?.[index - 1] || `Series ${index}`
        );
    }
}

function createLineMultiSeries(
    chart: am4charts.XYChart,
    prepared: PreparedChartData,
    names?: string[]
): void {
    const firstItem = prepared.data[0];

    if (!firstItem) {
        return;
    }

    const seriesCount = Number(firstItem.seriesCount || 0);

    for (let index = 1; index <= seriesCount; index += 1) {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = `propValueSeries_${index}`;
        series.dataFields.categoryX = "propText";
        series.name = names?.[index - 1] || `Series ${index}`;
        series.strokeWidth = 5;
        series.tensionX = 0.8;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
    }
}

function createColumnSeries(
    chart: am4charts.XYChart,
    valueField: string,
    name: string
): void {
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.valueY = valueField;
    series.dataFields.categoryX = "propText";
    series.name = name;
    series.columns.template.tooltipText =
        "{categoryX}: {valueY}";

    const hoverState = series.columns.template.column.states.create(
        "hover"
    );

    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;
}

function addLegend(
    chart:
        | am4charts.PieChart
        | am4charts.PieChart3D
        | am4charts.XYChart
        | am4charts.SlicedChart,
    showLegend?: boolean
): void {
    if (!showLegend) {
        return;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.labels.template.fontSize = 12;
}



type ChartCanvasProps = {
    type: ChartType;
    prepared: PreparedChartData;
    chartProps: ChartProps;
    onDataBound?: (event: { target: unknown }) => void;
    onClick?: (event: { target: unknown }) => void;
    onHoverIn?: (event: { target: unknown }) => void;
    onHoverOut?: (event: { target: unknown }) => void;
    onReady?: (chart: ChartInstance) => void;
};

function ChartCanvas(props: ChartCanvasProps): ReactElement {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<ChartInstance | null>(null);

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const chart = createChart(
            elementRef.current,
            props.type,
            props.prepared,
            props.chartProps
        );

        chartRef.current = chart;
        props.onReady?.(chart);

        const readyHandler = (event: { target: unknown }) => {
            props.onDataBound?.(event);
        };
        const hitHandler = (event: { target: unknown }) => {
            props.onClick?.(event);
        };
        const overHandler = (event: { target: unknown }) => {
            props.onHoverIn?.(event);
        };
        const outHandler = (event: { target: unknown }) => {
            props.onHoverOut?.(event);
        };

        chart.events.on("ready", readyHandler);
        chart.events.on("hit", hitHandler);
        chart.events.on("over", overHandler);
        chart.events.on("out", outHandler);

        return () => {
            chart.events.off("ready", readyHandler);
            chart.events.off("hit", hitHandler);
            chart.events.off("over", overHandler);
            chart.events.off("out", outHandler);
            chart.dispose();
            chartRef.current = null;
        };
    }, [
        props.type,
        props.chartProps.showLegend,
        props.chartProps.additionalChartDetails,
    ]);

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        chartRef.current.data = props.prepared.data;
    }, [props.prepared.data]);

    return <div ref={elementRef} className="chart_element" />;
}



function getDefaultChartIcons(): { [key: string]: string } {
    return {
        PieChart: "/images/icons/chart-icons/pie-chart.png",
        BarChart: "/images/icons/chart-icons/bar-chart.png",
        LineChart: "/images/icons/chart-icons/line-chart.png",
        SemiPieChart: "/images/icons/chart-icons/semipie-chart.png",
        ThreeDPieChart: "/images/icons/chart-icons/threedpie-chart.png",
        DonutChart: "/images/icons/chart-icons/donut-chart.png",
        FunnelChart: "/images/icons/chart-icons/funnel-chart.png",
        InnerThreeDPieChart: "/images/icons/chart-icons/threeDInnerpie-chart.png",
        DoubleDonutChart: "/images/icons/chart-icons/doubledonut-chart.png",
        DonutCumPieChart: "/images/icons/chart-icons/donutcumpie-chart.png",
        SimpleBarChart: "/images/icons/chart-icons/simplebar-chart.png",
        DoubleBarChart: "/images/icons/chart-icons/doublebar-chart.png",
        TreeMapChart: "/images/icons/chart-icons/treemap-chart.png",
    };
}

function getChartTooltip(type: ChartType): string {
    const names: { [key: string]: string } = {
        PieChart: "Pie Chart",
        BarChart: "Bar Chart",
        HorizontalBarChart: "Horizontal Bar Chart",
        LineChart: "Line Chart",
        SemiPieChart: "Semi-Pie Chart",
        ThreeDPieChart: "3D Pie Chart",
        DonutChart: "Donut Chart",
        FunnelChart: "Funnel Chart",
        InnerThreeDPieChart: "Inner 3D Pie Chart",
        DoubleDonutChart: "Double Donut Chart",
        DonutCumPieChart: "Donut cum Pie Chart",
        SimpleBarChart: "Simple Bar Chart",
        DoubleBarChart: "Double Bar Chart",
        TreeMapChart: "Tree Map Chart",
    };
    return names[type] || type;
}

// function ChartTable(props: {
//     data: ChartDataItem[];
//     columns?: ChartColumn[];
// }): ReactElement  {
//     const columns = props.columns || [];
//     const finalColumns: ChartColumn[] = columns.length
//         ? columns
//         : Object.keys(props.data[0] || {}).map((field) => ({
//               field,
//               title: field,
//           }));

//     return (
//         <div className="chart_detail_grid">
//             <div className="chart_detail_grid_scroll">
//                 <table>
//                     <thead>
//                         <tr>
//                             {finalColumns.map((column) => (
//                                 <th key={column.field} style={{ width: column.width }}>
//                                     {column.title}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {props.data.map((row, index) => (
//                             <tr key={index}>
//                                 {finalColumns.map((column, columnIndex) => (
//                                     <td key={`${column.field}-${columnIndex}`}>
//                                         {String(row[column.field] ?? "")}
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

function ChartModal(props: {
    type: "fullscreen" | "detail";
    title: string;
    children: ReactNode;
    onClose: () => void;
}): ReactElement {
    const className =
        props.type === "fullscreen"
            ? "graph_fullscreen_modal_holder active"
            : "graph_detail_modal_holder active";
    const modalClassName =
        props.type === "fullscreen"
            ? "graph_fullscreen_modal"
            : "graph_detail_modal";
    const titleClassName =
        props.type === "fullscreen"
            ? "graph_fullscreen_modal_title"
            : "graph_detail_modal_title";
    const bodyClassName =
        props.type === "fullscreen"
            ? "graph_fullscreen_modal_body"
            : "graph_detail_modal_body";

    return (
        <div className={className}>
            <div className={modalClassName}>
                <div
                    className={
                        props.type === "fullscreen"
                            ? "graph_fullscreen_modal_header"
                            : "graph_detail_modal_header"
                    }
                >
                    <div
                        className={
                            props.type === "fullscreen"
                                ? "graph_fullscreen_modal_title_cont"
                                : "graph_detail_modal_title_cont"
                        }
                    >
                        <p className={titleClassName}>{props.title}</p>
                    </div>
                    <div className="graph_modal_icon_cont">
                        <button
                            type="button"
                            className="inner_icon_cont"
                            title="Close"
                            onClick={props.onClose}
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
                <div className={bodyClassName}>{props.children}</div>
            </div>
        </div>
    );
}

const Chart = forwardRef<ChartHandle, ChartProps>(function Chart(props, ref): ReactElement | null {
    const graphIdRef = useRef(
        props.graphId || `chart-${Math.random().toString(36).substring(2, 10)}`
    );
    const graphId = graphIdRef.current;

    const [chartType, setChartType] = useState<ChartType>(props.type);
    const [isChartOptionOpen, setIsChartOptionOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [activeDetailTab, setActiveDetailTab] = useState<"details" | "summary">("details");
    const [data, setDataState] = useState<ChartDataItem[]>(props.data);
    const [isKilled, setIsKilled] = useState(false);
    const chartRef = useRef<ChartInstance | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const prepared = useMemo(
        () =>
            prepareChartData(
                data,
                props.additionalChartDetails
            ),
        [data, props.additionalChartDetails]
    );

    const chartOptions = props.chartOptions && props.chartOptions.length
        ? props.chartOptions
        : defaultChartOptions;
    const chartIcons = props.chartIcons || getDefaultChartIcons();

    useEffect(() => {
        setDataState(props.data);
    }, [props.data]);

    useEffect(() => {
        if (!props.changeChartOption) return;

        getSavedChartType(graphId).then((savedType) => {
            if (savedType && chartOptions.includes(savedType as ChartType)) {
                setChartType(savedType as ChartType);
            }
        }).catch(() => undefined);
    }, [graphId, props.changeChartOption, props.chartOptions]);

    useEffect(() => {
        const handler = () => {
            if (!wrapperRef.current || !props.mediaQuery) return;
            applyMediaQuery(wrapperRef.current, props);
        };
        window.addEventListener("resize", handler);
        handler();
        return () => window.removeEventListener("resize", handler);
    }, [props.mediaQuery, props.width, props.height]);

    useEffect(() => {
        if (isDetailOpen) {
            setTimeout(() => undefined, 0);
        }
    }, [isDetailOpen, activeDetailTab]);

    function handleChartReady(chart: ChartInstance): void {
        chartRef.current = chart;
    }

    function handleChartTypeChange(type: ChartType): void {
        if (type === chartType) return;
        setChartType(type);
        setIsChartOptionOpen(false);
        if (props.changeChartOption) {
            saveChartType(graphId, type).catch(() => undefined);
        }
    }

    function handleRefresh(): void {
        setIsKilled(false);
        setDataState([...data]);
    }

    function handleSoftRefresh(): void {
        if (chartRef.current) {
            chartRef.current.data = prepared.data;
        }
    }

    function handleSetData(nextData: ChartDataItem[]): void {
        setIsKilled(false);
        setDataState(nextData);
    }

    function handleKill(): void {
        chartRef.current?.dispose();
        chartRef.current = null;
        setIsKilled(true);
    }

    function handleReassureSize(): void {
        window.dispatchEvent(new Event("resize"));
    }

    useImperativeHandle(ref, () => ({
        refresh: handleRefresh,
        softRefresh: handleSoftRefresh,
        setData: handleSetData,
        reassureSize: handleReassureSize,
        kill: handleKill,
    }), [data, prepared.data]);


    if (isKilled) {
        return null;
    }

    const width = toCssSize(props.width);
    const height = toCssSize(props.height);

    const wrapperStyle: CSSProperties = {
        ...(props.wrapperAttributes?.style || {}),
        ...(width ? { width } : {}),
    };

    const bodyStyle: CSSProperties = {
        ...(props.graphEleWrapperAttributes?.style || {}),
        ...(height ? { height } : {}),
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={`graph_wrapper ${props.wantWrapperShadow ? "shadow" : ""
                    } ${props.wrapperAttributes?.className || ""}`}
                style={wrapperStyle}
            >
                {props.wantWrapperHeader && (
                    <div className="graph_header">
                        <div className="graph_title">
                            <p>{props.title}</p>
                        </div>

                        <div className="graph_icon_list">
                            {props.changeChartOption && (
                                <button
                                    type="button"
                                    className={`graph_icon_cont outlined_btn ${isChartOptionOpen ? "active" : ""}`}
                                    data-button-role="change chart"
                                    title="Change Chart"
                                    onClick={() => setIsChartOptionOpen(!isChartOptionOpen)}
                                >
                                    <i className="fa-chart-pie fas" />
                                </button>
                            )}

                            {props.detailOption && (
                                <button
                                    type="button"
                                    className="graph_icon_cont outlined_btn"
                                    data-button-role="detail"
                                    title="Detail"
                                    onClick={() => setIsDetailOpen(true)}
                                >
                                    <i className="fas fa-columns" />
                                </button>
                            )}

                            <button
                                type="button"
                                className="graph_icon_cont outlined_btn"
                                data-button-role="expand"
                                title="Expand"
                                onClick={() => setIsFullScreen(true)}
                            >
                                <i className="fas fa-expand" />
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className={`graph_body ${props.graphEleWrapperAttributes?.className || ""}`}
                    style={bodyStyle}
                >
                    <div
                        id={graphId}
                        className={`chart_element ${props.graphEleAttributes?.className || ""}`}
                        style={props.graphEleAttributes?.style}
                    >
                        <ChartCanvas
                            type={chartType}
                            prepared={prepared}
                            chartProps={props}
                            onReady={handleChartReady}
                            onDataBound={props.onDataBound}
                            onClick={props.onClick}
                            onHoverIn={props.onHoverIn}
                            onHoverOut={props.onHoverOut}
                        />
                    </div>
                </div>

                {props.changeChartOption && isChartOptionOpen && (
                    <div className="graph_change_cont visible" data-chartchange-cont-id={graphId}>
                        {chartOptions.map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`chart_type_img_cont ${chartType === option ? "active" : ""}`}
                                title={getChartTooltip(option)}
                                onClick={() => handleChartTypeChange(option)}
                            >
                                <img src={chartIcons[option]} alt={getChartTooltip(option)} />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isFullScreen && (
                <ChartModal
                    type="fullscreen"
                    title={props.title || ""}
                    onClose={() => {
                        setIsFullScreen(false);
                        setTimeout(() => reconcileSingleChartTooltip(chartRef.current, chartType), 0);
                    }}
                >
                    <div className="chart_modal_chart_area">
                        <ChartCanvas
                            type={chartType}
                            prepared={prepared}
                            chartProps={{ ...props, wantWrapperHeader: false, showLegend: true }}
                            onDataBound={props.onDataBound}
                            onClick={props.onClick}
                            onHoverIn={props.onHoverIn}
                            onHoverOut={props.onHoverOut}
                        />
                    </div>
                </ChartModal>
            )}

            {isDetailOpen && (
                <ChartModal
                    type="detail"
                    title={props.title || ""}
                    onClose={() => setIsDetailOpen(false)}
                >
                    <div id="detail_content_wrapper" data-detail-id={graphId} className="detail_content_wrapper">
                        <div className="detail_top_row">
                            <div className="detail_tabs">
                                <button
                                    type="button"
                                    className={`detail_tab ${activeDetailTab === "details" ? "active" : ""}`}
                                    onClick={() => setActiveDetailTab("details")}
                                >
                                    Details
                                </button>
                                <button
                                    type="button"
                                    className={`detail_tab ${activeDetailTab === "summary" ? "active" : ""}`}
                                    onClick={() => setActiveDetailTab("summary")}
                                >
                                    Summary
                                </button>
                            </div>

                            <div className="graph_detail_nav_btn_cont">
                                <button
                                    type="button"
                                    className="outlined_btn"
                                    title="Excel"
                                    onClick={() => props.onExcelClick?.(activeDetailTab === "details" ? dataForDetails(props) : dataForSummary(props))}
                                >
                                    <i className="fa-file-excel fas" />
                                </button>
                                <button
                                    type="button"
                                    className="outlined_btn"
                                    title="PDF"
                                    onClick={() => props.onPdfClick?.(activeDetailTab === "details" ? dataForDetails(props) : dataForSummary(props))}
                                >
                                    <i className="fa-file-pdf fas" />
                                </button>
                            </div>
                        </div>

                        {activeDetailTab === "details" ? (
                            <DataTable
                                data={props.detailData || []}
                                columns={(props.detailColumns || []).map((column) => ({
                                    field: column.field,
                                    title: column.title,
                                    width: column.width
                                        ? Number(column.width)
                                        : undefined,
                                }))}
                            />
                        ) : (
                            <DataTable
                                data={props.summaryData || []}
                                columns={(props.summaryColumns || []).map((column) => ({
                                    field: column.field,
                                    title: column.title,
                                    width: column.width
                                        ? Number(column.width)
                                        : undefined,
                                }))}
                            />
                        )}

                        <div className="graph_detail_modal_footer">
                            <div className="graph_detail_modal_row_count">
                                Row Count: <span>{activeDetailTab === "details" ? (props.detailData || []).length : (props.summaryData || []).length}</span>
                            </div>
                        </div>
                    </div>
                </ChartModal>
            )}
        </>
    );
});

function dataForDetails(props: ChartProps): ChartDataItem[] {
    return props.detailData || [];
}

function dataForSummary(props: ChartProps): ChartDataItem[] {
    return props.summaryData || [];
}

function applyMediaQuery(wrapper: HTMLDivElement, props: ChartProps): void {
    if (!props.mediaQuery || props.mediaQuery.length === 0) return;

    let matched = false;
    for (const query of props.mediaQuery) {
        let matches = true;
        if (query.maxWidth !== undefined) matches = matches && window.innerWidth <= query.maxWidth;
        if (query.minWidth !== undefined) matches = matches && window.innerWidth >= query.minWidth;
        if (!matches) continue;

        matched = true;
        const width = toCssSize(query.attributes.width);
        const height = toCssSize(query.attributes.height);
        if (width) wrapper.style.width = width;
        if (props.wantWrapperHeader && height) {
            const body = wrapper.querySelector<HTMLElement>(".graph_body");
            if (body) body.style.height = height;
        } else if (height) {
            wrapper.style.height = height;
        }
        break;
    }

    if (!matched) {
        const width = toCssSize(props.width);
        const height = toCssSize(props.height);
        if (width) wrapper.style.width = width;
        if (props.wantWrapperHeader && height) {
            const body = wrapper.querySelector<HTMLElement>(".graph_body");
            if (body) body.style.height = height;
        }
    }
}

function reconcileSingleChartTooltip(
    chart: ChartInstance | null,
    type: ChartType
): void {
    if (!chart) return;
    chart.series.values.forEach((series) => {
        if (series instanceof am4charts.ColumnSeries) {
            series.columns.template.tooltip = new am4core.Tooltip();
        }
        if (series instanceof am4charts.PieSeries || series instanceof am4charts.PieSeries3D) {
            series.slices.template.tooltip = new am4core.Tooltip();
        }
    });
    if (type !== "DoubleDonutChart" && type !== "DonutCumPieChart") {
        chart.data = chart.data;
    }
}


export default Chart;
