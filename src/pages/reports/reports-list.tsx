import { useAppData } from "@/App";
import { TReport } from "@/data-access/interfaces/report";
import { AgGridReact } from "ag-grid-react";


export function ReportsList() {
  console.log("ReportsList Rendered");
  const { employeeIncomeDeduction: rowData } = useAppData();
  console.log('Row Data',rowData);
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TReport).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));

  return (
    <>
      <h6 className="text-lg text-bold">Reports</h6>
      <div className="my-5 flex justify-between w-3/4 "></div>

      <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={rowData.value} // Row Data for Rows
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}
