import { EmployeesForm } from "@/components/employees/employees-form";
import { useEmployee } from "@/data-access/store/employees-store";
import { useMatch } from "@tanstack/react-location";

export function EmployeesEdit() {
  const {
    params: { id },
  } = useMatch();
  const { employees, editEmployee } = useEmployee();

  const employee = employees?.find((employee) => employee.id === +id);

  const onEmployeeEdited = (data: any) => {
    editEmployee({ ...data, id: +id });
  };

  return <EmployeesForm employee={employee} onSave={onEmployeeEdited} />;
}
