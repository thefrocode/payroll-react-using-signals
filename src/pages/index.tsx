import { useEmployee } from "@/data-access/store/employees-store";


export function Index() {
  //const { active_month, closeMonth } = useShared();
  const { no_of_employees } = useEmployee();
  //const { total_income } = useIncomeSource();
  //const { total_deductions } = useDeductionSource();
  return (
    <div className="flex">
      <p>No of Employees: {no_of_employees}</p>
    </div>
  );
}
