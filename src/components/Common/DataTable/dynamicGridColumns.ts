import type { DynamicGridColumn } from "./dataTable.types";

const MIN_COLUMN_WIDTH = 110;
const MAX_COLUMN_WIDTH = 360;
const COLUMN_PADDING = 48;
const SAMPLE_SIZE = 100;

function getColumnTitle(field: string): string {
    return field
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getCellText(value: unknown): string {
    if (value === null || value === undefined) {
        return "";
    }

    if (value instanceof Date) {
        return value.toLocaleDateString();
    }

    if (Array.isArray(value)) {
        return value.join(", ");
    }

    if (typeof value === "object") {
        return "[Object]";
    }

    return String(value);
}

function getTextWidth(
    text: string,
    context: CanvasRenderingContext2D | null
): number {
    if (!context) {
        return text.length * 8;
    }

    return context.measureText(text).width;
}

function getColumnWidth(
    field: string,
    title: string,
    data: Record<string, unknown>[],
    context: CanvasRenderingContext2D | null
): number {
    let maxWidth = getTextWidth(title, context);

    const sampleData = data.slice(0, SAMPLE_SIZE);

    sampleData.forEach((item) => {
        const cellText = getCellText(item[field]);
        const cellWidth = getTextWidth(cellText, context);

        if (cellWidth > maxWidth) {
            maxWidth = cellWidth;
        }
    });

    const calculatedWidth = Math.ceil(maxWidth + COLUMN_PADDING);

    return Math.min(
        Math.max(calculatedWidth, MIN_COLUMN_WIDTH),
        MAX_COLUMN_WIDTH
    );
}

export function fitColumnsToGrid(
    columns: DynamicGridColumn[],
    containerWidth: number
): DynamicGridColumn[] {

    const totalWidth = columns.reduce(
        (total, column) => total + column.width,
        0
    );

    // Content needs more space than the Grid.
    // Keep natural widths and allow horizontal scrolling.
    if (totalWidth >= containerWidth) {
        return columns;
    }

    const extraWidth = containerWidth - totalWidth;
    const extraPerColumn = extraWidth / columns.length;

    return columns.map((column) => ({
        ...column,
        width: Math.floor(column.width + extraPerColumn)
    }));
}

export function buildDynamicColumns(
    data: Record<string, unknown>[],
    fieldNames?: string[]
): DynamicGridColumn[] {
    const fields: string[] = [];

    // Use backend field names when available.
    if (fieldNames && fieldNames.length > 0) {
        fields.push(...fieldNames);
    } else {
        // Otherwise, collect fields from the returned records.
        const sampleData = data.slice(0, SAMPLE_SIZE);

        sampleData.forEach((item) => {
            Object.keys(item).forEach((field) => {
                if (!fields.includes(field)) {
                    fields.push(field);
                }
            });
        });
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
        context.font = "14px Arial";
    }

    return fields.map((field) => {
        const title = getColumnTitle(field);

        const width = getColumnWidth(
            field,
            title,
            data,
            context
        );

        return {
            field,
            title,
            width,
        };
    });
}