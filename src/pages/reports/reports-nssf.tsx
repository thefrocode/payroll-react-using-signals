import { AgGridReact } from "ag-grid-react";
import { TReportNSSF } from "../../shared/interfaces/report";
import { useReportsSource } from "../store/reports";
import { useCurrentReportsSource } from "../store/reports-current";
export function ReportsNSSF() {
  // console.log("ReportsNSSF Rendered");
  // const { data: rowData } = useCurrentReportsSource();
  // const columnDefs: {
  //   headerName: string;
  //   field: string;
  //   cellRenderer?: (params: any) => any;
  // }[] = Object.keys(TReportNSSF).map((key) => ({
  //   headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
  //   field: key,
  // }));

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      {/* <AgGridReact
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs}
      /> */}
      <p>Hello</p>
    </div>
  );
}
