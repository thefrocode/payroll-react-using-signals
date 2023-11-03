import { EmployeesForm } from "@/components/employees/employees-form";
import { Employee } from "@/data-access/interfaces/employee";
import { useEmployee } from "@/data-access/store/employees-store";

export function EmployeesAdd() {
  const { addEmployee } = useEmployee();
  const onEmployeeAdded = (data: Employee) => {
    addEmployee(data);
  };

  return <EmployeesForm onSave={onEmployeeAdded} />;
}
