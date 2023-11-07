import { useSharedSource } from "@/data-access/store/active";
import { useEmployee } from "@/data-access/store/employees-store";
import { useFormulasSource } from "@/data-access/store/formulas";


export function Index() {
  const { closeMonth } = useSharedSource();
  const { error } = useFormulasSource();
  //const { no_of_employees } = useEmployee();
  //const { total_income } = useIncomeSource();
  //const { total_deductions } = useDeductionSource();
  return (
    <div className="flex">
      <p>No of Employees: </p>
    </div>
  );
}
