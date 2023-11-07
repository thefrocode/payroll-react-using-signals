import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useDeductionSource } from "@/data-access/store/deduction";
import { TDetailedDeduction } from "@/data-access/interfaces/deduction";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/App";
import { useDeductionTypeSource } from "@/data-access/store/deduction-type";
import { useSharedSource } from "@/data-access/store/active";

export function DeductionsList() {
  const { removeDeduction } = useDeductionSource();
  const { error } = useDeductionTypeSource()
  const { detailedDeductions } = useAppData();
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TDetailedDeduction).map((key) => ({
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
            <Link key={params.value} to={`/deductions/edit/${params.value}`}>
              Edit
            </Link>
          </Button>
          <Button
            className="py-0 px-3 mt-1"
            key={params.value}
            onClick={() => removeDeduction(params.value)}
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
        <h1 className="text-2xl font-bold">Deductions</h1>
        <Button asChild className="float-right">
          <Link to="/deductions/add">Add Deduction</Link>
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 430 }}>
        <AgGridReact
          rowData={detailedDeductions.value} // Row Data for Rows
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
