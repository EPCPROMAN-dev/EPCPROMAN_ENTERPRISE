import { useEffect, useMemo, useRef, useState } from "react";

import {
    Grid,
    GridColumn
} from "@progress/kendo-react-grid";

import type { DataTableProps } from "./dataTable.types";

import {
    buildDynamicColumns,
    fitColumnsToGrid
} from "./dynamicGridColumns";

import "./DataTable.css";

function DynamicDataTable(props: DataTableProps) {

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;

            setContainerWidth(Math.floor(width));
        });

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    const columns = useMemo(() => {

        const dynamicColumns = buildDynamicColumns(
            props.data,
            props.fieldNames
        );

        if (containerWidth === 0) {
            return dynamicColumns;
        }

        return fitColumnsToGrid(
            dynamicColumns,
            containerWidth
        );

    }, [props.data, props.fieldNames, containerWidth]);

    return (
        <div ref={containerRef} className="data_table">

            <Grid
                data={props.data}
                dataItemKey={props.rowIdField}
                style={{ height: "100%", width: "100%" }}
                sortable={true}
                filterable={true}
                resizable={true}
            >
                {columns.map((column) => (
                    <GridColumn
                        key={column.field}
                        field={column.field}
                        title={column.title}
                        width={column.width}
                        minWidth={110}
                    />
                ))}
            </Grid>

        </div>
    );
}

export default DynamicDataTable;