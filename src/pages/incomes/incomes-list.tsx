import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useIncomeSource } from "@/data-access/store/income";
import { TDetailedIncome } from "@/data-access/interfaces/income";
import { Button } from "@/components/ui/button";

export function IncomesList() {
  const { detailed_incomes, removeIncome } = useIncomeSource();

  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TDetailedIncome).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
    width: 170,
  }));
  columnDefs.push({
    field: "id",
    headerName: "Actions",
    cellRenderer: (params: any) => {
      return (
        <div className="flex flex-row gap-2">
          <Button asChild className="py-0 px-3 mt-1">
            <Link key={params.value} to={`/incomes/edit/${params.value}`}>
              Edit
            </Link>
          </Button>
          <Button
            className="py-0 px-3 mt-1"
            key={params.value}
            onClick={() => removeIncome(params.value)}
          >
            Edit
          </Button>
        </div>
      );
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Incomes</h1>
        <Button asChild className="float-right">
          <Link to="/incomes/add">Add Income</Link>
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 430 }}>
        <AgGridReact
          rowData={detailed_incomes} // Row Data for Rows
          columnDefs={columnDefs}
          gridOptions={{
            rowHeight: 45,
            pagination: true,
            paginationPageSize: 10,
          }}
        />
      </div>
    </div>
  );
}
