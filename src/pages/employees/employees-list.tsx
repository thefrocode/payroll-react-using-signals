import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { TEmployee } from "@/data-access/interfaces/employee";
import { useEmployee } from "@/data-access/store/employees-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmployeesList() {
  const { employees, removeEmployee } = useEmployee();

  const columnDefs: {
    headerName: string;
    field: string;
    resizable: boolean;
   
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TEmployee).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
    resizable: true,
    width: 150
  }));
  columnDefs.push({
    field: "id",
    headerName: "Action",
    resizable: true,
    cellRenderer: (params: any) => {
      return (
        <div className="flex flex-row gap-2">
          <Button asChild className="py-0 px-3 mt-1">
            <Link key={params.value} to={`/employees/edit/${params.value}`}>
              Edit
            </Link>
          </Button>
          <Button className="py-0 px-3 mt-1"
            key={params.value}
            onClick={() => removeEmployee(params.value)}
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
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button asChild className="float-right">
          <Link to="/employees/add">Add Employee</Link>
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 430 }}>
        <AgGridReact
          rowData={employees} // Row Data for Rows
          columnDefs={columnDefs}
          gridOptions={{rowHeight: 45, pagination: true, paginationPageSize: 10}}
        />
      </div>
    </div>
  );
}
