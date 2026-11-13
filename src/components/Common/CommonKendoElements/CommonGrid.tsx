
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import type { CommonGridProps, CommonGridColumn } from "./common-grid.types";
import "./KendoElements.css";

function renderColumns(columns: CommonGridColumn[]) {
  return columns.map((column, index) => (
    <GridColumn
      key={column.field ?? column.title ?? index}
      {...column}
    >
      {column.children && renderColumns(column.children)}
    </GridColumn>
  ));
}

export default function CommonGrid({
  data,
  columns,
  dataItemKey = "id",
  // loading = false,
  showTotalRecords = true,
}: CommonGridProps) {
  return (
    <div className="common-grid">
      <Grid
      
        data={data}
        dataItemKey={dataItemKey}
        scrollable="scrollable"
        // filterable="true"
      >
        {renderColumns(columns)}
      </Grid>

      {/* {loading ? (
        <div className="common-grid-empty">Loading records...</div>
      ) : data.length === 0 ? (
        <div className="common-grid-empty">{emptyMessage}</div>
      ) : null} */}

      {showTotalRecords && (
        <div className="common-grid-footer">
          Total Records: {data.length}
        </div>
      )}
    </div>
  );
}
