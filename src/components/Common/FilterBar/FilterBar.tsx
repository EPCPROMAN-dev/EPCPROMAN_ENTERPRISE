
import type { FilterConfig, FilterOption } from "./filter.types";
import {
    DropDownList,
    MultiSelect
} from "@progress/kendo-react-dropdowns";

// import type { FilterConfig } from "./filter.types";

import "./FilterBar.css";



type FilterBarProps = {
    filters: FilterConfig[];
    filterValues: { [key: string]: string | string[] };
    onFilterChange: (field: string, value: string | string[]) => void;
    onReset: () => void;
};

function FilterBar(props: FilterBarProps) {
    const filters = props.filters;
    const filterValues = props.filterValues;

    const onFilterChange = props.onFilterChange

  

    return (

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap  items-end gap-4">

                {filters.map((filter) => (
                    <div key={filter.field} className="w-64">

                        <label className="mb-2 block text-sm font-medium">
                            {filter.label}
                        </label>

                        {filter.type === "dropdown" && (
                            <DropDownList

                                className="filter-control"
                                data={filter.options}
                                textField="label"
                                dataItemKey="value"
                                value={filter.options.find(
                                    (option) =>
                                        option.value === filterValues[filter.field]
                                )}
                               

                    
                                onChange={(event) => {
                                    onFilterChange(
                                        filter.field,
                                        event.value.value
                                    );

                                    
                                }}
                            />
                        )}

                        {filter.type === "multiselect" && (
                            <MultiSelect
                                checkboxes={true}
                                selectAll={true}
                                className="filter-control"
                                data={filter.options}
                                textField="label"
                                dataItemKey="value"
                                value={filter.options.filter((option) => {
                                    const selectedValues =
                                        filterValues[filter.field];

                                    if (Array.isArray(selectedValues)) {
                                        return selectedValues.includes(
                                            option.value
                                        );
                                    }

                                    return false;
                                })}
                                onChange={(event) => {
                                    const values = event.value.map(
                                        (item: FilterOption) => item.value
                                    );

                                    onFilterChange(
                                        filter.field,
                                        values
                                    );
                                }}
                            />
                        )}

                    </div>
                ))}

                <div >
                    <button
                        type="button"
                        onClick={props.onReset}
                        className="rounded bg-blue-600 px-4 py-2 w-full text-white"
                    >
                        Reset
                    </button>
                </div>

            </div>

        </div>
    );
}

export default FilterBar;