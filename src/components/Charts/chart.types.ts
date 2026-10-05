import type { CSSProperties } from "react";

export type ChartType =
    | "PieChart"
    | "BarChart"
    | "HorizontalBarChart"
    | "LineChart"
    | "SemiPieChart"
    | "ThreeDPieChart"
    | "DonutChart"
    | "FunnelChart"
    | "InnerThreeDPieChart"
    | "DoubleDonutChart"
    | "DonutCumPieChart"
    | "SimpleBarChart"
    | "DoubleBarChart"
    | "TreeMapChart";

export type ChartDataItem = {
    [key: string]: string | number | null | undefined;
};

// export type PropTextFormItem = {
//     type: "text" | "value";
//     textForm?: string;
// };

// export type PropTextForm = {
//     [key: string]: PropTextFormItem;
// };

export type AdditionalChartDetails = {
    x: string;
    y: string[];
};

export type ChartSize = string | number;

export type ChartMediaQuery = {
    minWidth?: number;
    maxWidth?: number;
    attributes: {
        width?: ChartSize;
        height?: ChartSize;
    };
};

export type ChartEvent = {
    target?: unknown;
    [key: string]: unknown;
};

export type ChartColumn = {
    field: string;
    title: string;
    width?: string | number;
};

export type ChartProps = {
    data: ChartDataItem[];
    type: ChartType;
    title?: string;
    graphId?: string;

    width?: ChartSize;
    height?: ChartSize;

    // propTextForm?: PropTextForm;
    showLegend?: boolean;
    // isForAIAssistant?: boolean;
    additionalChartDetails?: AdditionalChartDetails;

    wantWrapperHeader?: boolean;
    wantWrapperShadow?: boolean;
    changeChartOption?: boolean;
    detailOption?: boolean;

    chartOptions?: ChartType[];
    chartIcons?: { [key: string]: string };

    mediaQuery?: ChartMediaQuery[];

    wrapperAttributes?: {
        className?: string;
        style?: CSSProperties;
    };
    graphEleWrapperAttributes?: {
        className?: string;
        style?: CSSProperties;
    };
    graphEleAttributes?: {
        className?: string;
        style?: CSSProperties;
    };

    onDataBound?: (chart: ChartEvent) => void;
    onClick?: (chart: ChartEvent) => void;
    onHoverIn?: (chart: ChartEvent) => void;
    onHoverOut?: (chart: ChartEvent) => void;

    detailData?: ChartDataItem[];
    detailColumns?: ChartColumn[];
    summaryData?: ChartDataItem[];
    summaryColumns?: ChartColumn[];

    onExcelClick?: (data: ChartDataItem[]) => void;
    onPdfClick?: (data: ChartDataItem[]) => void;
};

export type ChartHandle = {
    refresh: () => void;
    softRefresh: () => void;
    setData: (data: ChartDataItem[]) => void; //, propTextForm?: PropTextForm
    reassureSize: () => void;
    kill: () => void;
};
