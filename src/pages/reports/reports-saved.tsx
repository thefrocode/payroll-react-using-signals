import { ChangeEvent } from "react";
import { TReport } from "../../shared/interfaces/report";
import { useSavedReportsSource } from "../store/reports-saved";
import { months } from "../../shared/interfaces/months";
import { years } from "../../shared/interfaces/years";
import { AgGridReact } from "ag-grid-react";
import { useEmployee } from "../../employees/store";
export function ReportsSaved() {
  console.log("ReportsSaved Rendered");
  const { data: rowData, filterReports } = useSavedReportsSource();
  const { employees } = useEmployee();
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TReport).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target;
    filterReports({ [name]: value });
  };

  return (
    <>
      <h6 className="text-lg text-bold">Reports</h6>
      <div className="my-5 flex justify-between w-3/4 ">
        <select onChange={handleChange} name="employee_id">
          <option value="">Select Employee</option>
          {employees &&
            employees.map((employee: any) => {
              return (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.second_name}
                </option>
              );
            })}
        </select>

        <select onChange={handleChange} name="month">
          <option value="">Select Month</option>
          {months.map((month: any) => {
            return (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            );
          })}
        </select>
        <select onChange={handleChange} name="year">
          <option value="">Select Year</option>
          {years.map((year: any) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}
