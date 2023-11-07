import { AgGridReact } from "ag-grid-react";

export function ReportsNHIF() {

  // console.log("ReportsNHIF Rendered");
  // const { data: rowData } = useCurrentReportsSource();
  // const columnDefs: {
  //   headerName: string;
  //   field: string;
  //   cellRenderer?: (params: any) => any;
  // }[] = Object.keys(TReportNHIF).map((key) => ({
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
