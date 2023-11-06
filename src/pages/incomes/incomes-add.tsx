import { IncomesForm } from "@/components/incomes/incomes-form";
import { Income } from "@/data-access/interfaces/income";
import { useShared } from "@/data-access/store/active";
import { useEmployee } from "@/data-access/store/employees-store";
import { useIncomeSource } from "@/data-access/store/income";
import { useIncomeTypeSource } from "@/data-access/store/income-type";

export function IncomesAdd() {
  const { addIncome } = useIncomeSource();
  const { employees } = useEmployee();
  const { income_types } = useIncomeTypeSource();
  const { active_month } = useShared();
  const onIncomeAdded = (data: Income) => {
    addIncome(data);
  };

  return (
    <IncomesForm
      employees={employees}
      income_types={income_types}
      active_month={active_month}
      onSave={onIncomeAdded}
    />
  );
}
