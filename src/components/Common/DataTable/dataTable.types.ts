export type DataTableColumn = {
    field: string;
    title: string;
    width?: number;
};


export type DynamicGridColumn = {
    field: string;
    title: string;
    width: number;
};

export type DataTableProps = {
    data: Record<string, unknown>[];
    fieldNames?: string[];
    rowIdField?: string;
};