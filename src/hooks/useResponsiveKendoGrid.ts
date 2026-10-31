
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseResponsiveKendoGridOptions {
  baseColumnWidths: number[];
  minColumnWidth?: number;
}

export function useResponsiveKendoGrid({
  baseColumnWidths,
  minColumnWidth = 150,
}: UseResponsiveKendoGridOptions) {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [gridWidth, setGridWidth] = useState(0);
  const [lockedWidth, setLockedWidth] = useState(0);

  const measureGrid = useCallback(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    const currentWidth = Math.round(
      container.getBoundingClientRect().width
    );

    const lockedHeaders = container.querySelectorAll<HTMLElement>(
      ".k-grid-header-sticky"
    );

    const measuredLockedWidth = Math.round(
      Array.from(lockedHeaders).reduce(
        (total, header) =>
          total + header.getBoundingClientRect().width,
        0
      )
    );

    setGridWidth(currentWidth);
    setLockedWidth(measuredLockedWidth);
  }, []);

  useEffect(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    measureGrid();

    const observer = new ResizeObserver(measureGrid);
    observer.observe(container);

    return () => observer.disconnect();
  }, [measureGrid]);

  const proportionalWidths = useMemo(() => {
    const baseWidths = baseColumnWidths.map((width) =>
      Math.max(minColumnWidth, width)
    );

    const totalBaseWidth = baseWidths.reduce(
      (total, width) => total + width,
      0
    );

    const availableWidth = Math.max(0, gridWidth - lockedWidth-20);
    const extraWidth = Math.max(0, availableWidth - totalBaseWidth);

    if (totalBaseWidth === 0 || extraWidth === 0) {
      return baseWidths;
    }

    return baseWidths.map((width) =>
      Math.max(
        minColumnWidth,
        Math.round(width + (extraWidth * width) / totalBaseWidth)
      )
    );
  }, [baseColumnWidths, gridWidth, lockedWidth, minColumnWidth]);

  return {
    gridContainerRef,
    proportionalWidths,
    gridWidth,
    lockedWidth,
    measureGrid,
  };
}
