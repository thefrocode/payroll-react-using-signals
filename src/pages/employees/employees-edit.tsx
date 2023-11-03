import { EmployeesForm } from "@/components/employees/employees-form";
import { Employee } from "@/data-access/interfaces/employee";
import { useEmployee } from "@/data-access/store/employees-store";

export function EmployeesEdit() {
  const { editEmployee } = useEmployee();
  const onEmployeeEdited = (data: Employee) => {
    editEmployee(data);
  };

  return <EmployeesForm onSave={onEmployeeEdited} />;
}
