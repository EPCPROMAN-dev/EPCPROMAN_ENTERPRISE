import { useState } from "react";
import {
    DataGrid,
    type GridSortModel,
} from "@mui/x-data-grid";

import type { DataTableColumn } from "../../Common/DataTable/dataTable.types";

import "./DataTable.css";

type DataTableProps = {
    data: { [key: string]: unknown }[];
    columns: DataTableColumn[];
};

function DataTable(props: DataTableProps) {
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    const rows = props.data.map((item, index) => ({
        id: index,
        ...item,
    }));

   const gridColumns = props.columns.map((column) => ({
    field: column.field,
    headerName: column.title,
    width: column.width,
    flex: column.width ? undefined : 1,
}));

    return (
        <div className="data_table">
        <DataGrid
    rows={rows}
    columns={gridColumns}
    className="data_table_grid"
    sortingMode="client"
    sortModel={sortModel}
    onSortModelChange={setSortModel}
    disableRowSelectionOnClick
    hideFooter
/>
        </div>
    );
}

export default DataTable;