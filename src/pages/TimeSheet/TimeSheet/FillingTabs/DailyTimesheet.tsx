import { useState, } from "react";
import AppDatePicker from "../../../../components/Common/CommonKendoElements/AppDatePicker";
import AppTimePicker from "../../../../components/Common/CommonKendoElements/AppTimePicker";
import {
  Grid,
  GridColumn,
} from "@progress/kendo-react-grid";
import { useResponsiveKendoGrid } from "../../../../hooks/useResponsiveKendoGrid";

interface DailyFormData {
  date: Date | null;
  signInTime: Date | null;
  signOutTime: Date | null;
  lcReason: string;
}

//demo data
const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "10 boxes x 20 bags",
    UnitPrice: 18.0,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 8, 26),
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "24 - 12 oz bottles",
    UnitPrice: 19.0,
    UnitsInStock: 17,
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 8, 26),
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: "12 - 550 ml bottles",
    UnitPrice: 10.0,
    UnitsInStock: 13,
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 9, 3),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 4,
    ProductName: "Chef Anton's Cajun Seasoning",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "48 - 6 oz jars",
    UnitPrice: 22.0,
    UnitsInStock: 53,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 9, 3),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 5,
    ProductName: "Chef Anton's Gumbo Mix",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "36 boxes",
    UnitPrice: 21.35,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    FirstOrderedOn: new Date(1996, 9, 10),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 6,
    ProductName: "Grandma's Boysenberry Spread",
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: "12 - 8 oz jars",
    UnitPrice: 25.0,
    UnitsInStock: 120,
    UnitsOnOrder: 0,
    ReorderLevel: 25,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 9, 17),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 7,
    ProductName: "Uncle Bob's Organic Dried Pears",
    SupplierID: 3,
    CategoryID: 7,
    QuantityPerUnit: "12 - 1 lb pkgs.",
    UnitPrice: 30.0,
    UnitsInStock: 15,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 10, 5),
    Category: {
      CategoryID: 7,
      CategoryName: "Produce",
      Description: "Dried fruit and bean curd",
    },
  },
  {
    ProductID: 8,
    ProductName: "Northwoods Cranberry Sauce",
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: "12 - 12 oz jars",
    UnitPrice: 40.0,
    UnitsInStock: 6,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 10, 12),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 9,
    ProductName: "Mishi Kobe Niku",
    SupplierID: 4,
    CategoryID: 6,
    QuantityPerUnit: "18 - 500 g pkgs.",
    UnitPrice: 97.0,
    UnitsInStock: 29,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    FirstOrderedOn: new Date(1996, 10, 19),
    Category: {
      CategoryID: 6,
      CategoryName: "Meat/Poultry",
      Description: "Prepared meats",
    },
  },
  {
    ProductID: 10,
    ProductName: "Ikura",
    SupplierID: 4,
    CategoryID: 8,
    QuantityPerUnit: "12 - 200 ml jars",
    UnitPrice: 31.0,
    UnitsInStock: 31,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 11, 3),
    Category: {
      CategoryID: 8,
      CategoryName: "Seafood",
      Description: "Seaweed and fish",
    },
  },
  {
    ProductID: 11,
    ProductName: "Queso Cabrales",
    SupplierID: 5,
    CategoryID: 4,
    QuantityPerUnit: "1 kg pkg.",
    UnitPrice: 21.0,
    UnitsInStock: 22,
    UnitsOnOrder: 30,
    ReorderLevel: 30,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 11, 10),
    Category: {
      CategoryID: 4,
      CategoryName: "Dairy Products",
      Description: "Cheeses",
    },
  },
  {
    ProductID: 12,
    ProductName: "Queso Manchego La Pastora",
    SupplierID: 5,
    CategoryID: 4,
    QuantityPerUnit: "10 - 500 g pkgs.",
    UnitPrice: 38.0,
    UnitsInStock: 86,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1996, 11, 17),
    Category: {
      CategoryID: 4,
      CategoryName: "Dairy Products",
      Description: "Cheeses",
    },
  },
  {
    ProductID: 13,
    ProductName: "Konbu",
    SupplierID: 6,
    CategoryID: 8,
    QuantityPerUnit: "2 kg box",
    UnitPrice: 6.0,
    UnitsInStock: 24,
    UnitsOnOrder: 0,
    ReorderLevel: 5,
    Discontinued: false,
    FirstOrderedOn: new Date(1997, 0, 7),
    Category: {
      CategoryID: 8,
      CategoryName: "Seafood",
      Description: "Seaweed and fish",
    },
  },
  {
    ProductID: 14,
    ProductName: "Tofu",
    SupplierID: 6,
    CategoryID: 7,
    QuantityPerUnit: "40 - 100 g pkgs.",
    UnitPrice: 23.25,
    UnitsInStock: 35,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1997, 0, 14),
    Category: {
      CategoryID: 7,
      CategoryName: "Produce",
      Description: "Dried fruit and bean curd",
    },
  },
  {
    ProductID: 15,
    ProductName: "Genen Shouyu",
    SupplierID: 6,
    CategoryID: 2,
    QuantityPerUnit: "24 - 250 ml bottles",
    UnitPrice: 15.5,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 5,
    Discontinued: false,
    FirstOrderedOn: new Date(1997, 1, 4),
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 16,
    ProductName: "Pavlova",
    SupplierID: 7,
    CategoryID: 3,
    QuantityPerUnit: "32 - 500 g boxes",
    UnitPrice: 17.45,
    UnitsInStock: 29,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    FirstOrderedOn: new Date(1997, 1, 11),
    Category: {
      CategoryID: 3,
      CategoryName: "Confections",
      Description: "Desserts, candies, and sweet breads",
    },
  },
  {
    ProductID: 17,
    ProductName: "Alice Mutton",
    SupplierID: 7,
    CategoryID: 6,
    QuantityPerUnit: "20 - 1 kg tins",
    UnitPrice: 39.0,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    FirstOrderedOn: new Date(1997, 2, 4),
    Category: {
      CategoryID: 6,
      CategoryName: "Meat/Poultry",
      Description: "Prepared meats",
    },
  },
  {
    ProductID: 18,
    ProductName: "Carnarvon Tigers",
    SupplierID: 7,
    CategoryID: 8,
    QuantityPerUnit: "16 kg pkg.",
    UnitPrice: 62.5,
    UnitsInStock: 42,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    FirstOrderedOn: new Date(1997, 2, 11),
    Category: {
      CategoryID: 8,
      CategoryName: "Seafood",
      Description: "Seaweed and fish",
    },
  },
];

export default function DailyTimesheet() {
  
  // for Grid calculation
  const { gridContainerRef, proportionalWidths } = useResponsiveKendoGrid({
    baseColumnWidths: [50, 250, 350, 450],
    minColumnWidth: 50,
  });

  
  //Reset handle start
  const [formData, setFormData] = useState<DailyFormData>({
    date: new Date(),
    signInTime: null,
    signOutTime: null,
    lcReason: "",
  });

  const handleReset = () => {
    setFormData({
      date: new Date(),
      signInTime: null,
      signOutTime: null,
      lcReason: "",
    });
  };
  //Reset handle end

  return (
    <div className="pt-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
        <AppDatePicker
          label="Date"
          value={formData.date}
          onChange={(value) =>
            setFormData((current) => ({ ...current, date: value }))
          }
          required
        />

        <AppTimePicker
          label="Sign-In Time"
          value={formData.signInTime}
          onChange={(value) =>
            setFormData((current) => ({ ...current, signInTime: value }))
          }
          required
        />

        <AppTimePicker
          label="Sign-Out Time"
          value={formData.signOutTime}
          onChange={(value) =>
            setFormData((current) => ({ ...current, signOutTime: value }))
          }
          required
        />

        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            LC Reason
          </label>

          <textarea
            id="lcReason"
            value={formData.lcReason}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                lcReason: event.target.value,
              }))
            }
            rows={1}
            placeholder="Enter LC reason"
            className="app-textarea"
          />
        </div>

        <div className="mt-4 flex">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-500 hover:border-transparent-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={gridContainerRef}
        className="mt-6 w-full min-w-0"
        id="timesheet-grid-container"
      >
        <Grid
          style={{ height: "calc(100vh - 300px)",width:"100%"}}
          data={products}
          autoProcessData={true}
          dataItemKey="ProductID"
          sortable={true}
          resizable={true}
          // pageable={true}
          // defaultTake={8}
          defaultSkip={0}
          scrollable="scrollable"
          // pageSize={8}
          // columnMenuIcon={filterIcon}
        >
          <GridColumn
           width={proportionalWidths[0]}
          
            // width={110}
            
            field="ProductID"
            title="ID"
            // columnMenu={ColumnMenu}
            // locked={true}
          />
          <GridColumn
            // width={150}
             width={proportionalWidths[1]}
            field="ProductName"
            title="Product Name"
            // columnMenu={ColumnMenuCheckboxFilter}
            // locked={true}
          />
          <GridColumn
            width={proportionalWidths[2]}
              // width={110}
            field="Category.CategoryName"
            title="Category Name"
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            width={proportionalWidths[3]}
              // width={110}
            field="UnitPrice"
            filter={"numeric"}
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          {/* <GridColumn
            // width={proportionalWidths[2]}
              width={110}
            field="FirstOrderedOn"
            filter="date"
            format="{0:d}"
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[3]}
              width={110}
            field="Discontinued"
            filter={"boolean"}
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[4]}
              width={110}
            field="ProductName"
            title="Product Name"
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[5]}
             width={110}

            field="Category.CategoryName"
            title="Category Name"
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[6]}
             width={110}
            field="UnitPrice"
            filter={"numeric"}
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[7]}
             width={110}
            field="FirstOrderedOn"
            filter="date"
            format="{0:d}"
            // columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            // width={proportionalWidths[8]}
             width={110}
            field="Discontinued"
            filter={"boolean"}
            // columnMenu={ColumnMenuCheckboxFilter}
          /> */}
        </Grid>
      </div>
    </div>
  );
}
