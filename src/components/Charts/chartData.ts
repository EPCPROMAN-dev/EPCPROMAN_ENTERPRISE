import type {
    AdditionalChartDetails,
    ChartDataItem,
} from "./chart.types";

export type PreparedChartData = {
    data: ChartDataItem[];
    multiSeries: boolean;
    totalValue: number;
};

function getNumber(value: string | number | null | undefined): number {
    if (typeof value === "number") {
        return value;
    }

    if (typeof value === "string") {
        const numberValue = Number(value);

        if (!Number.isNaN(numberValue)) {
            return numberValue;
        }
    }

    return 0;
}

export function prepareChartData(
    data: ChartDataItem[],
    additionalChartDetails?: AdditionalChartDetails
): PreparedChartData {
    if (!additionalChartDetails) {
        return {
            data: data,
            multiSeries: false,
            totalValue: 0,
        };
    }

    const xField = additionalChartDetails.x;
    const yFields = additionalChartDetails.y;

    const multiSeries = yFields.length > 1;

    let totalValue = 0;

    const preparedData = data.map((item) => {
        const newItem: ChartDataItem = {
            ...item,
            propText: item[xField],
        };

        yFields.forEach((field, index) => {
            const value = item[field];

            newItem[`propValueSeries_${index + 1}`] = value;

            totalValue += getNumber(value);

            if (index === 0) {
                newItem.propValue = value;
            }
        });

        if (multiSeries) {
            newItem.seriesCount = yFields.length;
        }

        return newItem;
    });

    return {
        data: preparedData,
        multiSeries: multiSeries,
        totalValue: totalValue,
    };
}