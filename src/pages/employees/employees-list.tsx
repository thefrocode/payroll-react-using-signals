import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { TEmployee } from "@/data-access/interfaces/employee";
import { useEmployee } from "@/data-access/store/employees-store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
export function EmployeesList() {
  const { employees, removeEmployee } = useEmployee();

  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TEmployee).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));
  columnDefs.push({
    field: "id",
    headerName: "Delete",
    cellRenderer: (params: any) => {
      return (
        <Link key={params.value} to={`/employees/edit/${params.value}`}>
          Edit
        </Link>
      );
    },
  });
  columnDefs.push({
    field: "id",
    headerName: "Delete",
    cellRenderer: (params: any) => {
      return (
        <button key={params.value} onClick={() => removeEmployee(params.value)}>
          Edit
        </button>
      );
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button asChild className="float-right">
          <Link to="/employees/add">Add Employee</Link>
        </Button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          rowData={employees} // Row Data for Rows
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}
