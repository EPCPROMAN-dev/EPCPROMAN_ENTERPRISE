
import type { GridColumnProps } from "@progress/kendo-react-grid";

// extends means inherit and reuse existing type properties, then optionally add more. It's especially useful when building reusable components like our CommonGrid.
export interface CommonGridColumn extends GridColumnProps {
  field?: string;
  title?: string;
  children?: CommonGridColumn[];
}


export interface CommonGridProps {
  data: Record<string, unknown>[];
  columns: CommonGridColumn[];
  dataItemKey?: string;
  loading?: boolean;
  showTotalRecords?: boolean;
}
