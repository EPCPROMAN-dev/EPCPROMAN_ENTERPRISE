export type FilterOption = {
    label: string;
    value: string;
};

export type FilterConfig = {
    field: string;
    label: string;
    type: string;
    options: FilterOption[];
    defaultValue: string | string[];
};