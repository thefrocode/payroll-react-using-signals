import { useAppData } from "@/App";
import { IncomesForm } from "@/components/incomes/incomes-form";
import { Income } from "@/data-access/interfaces/income";
import { useShared } from "@/data-access/store/active";
import { useIncomeSource } from "@/data-access/store/income";

export function IncomesAdd() {
  const { addIncome } = useIncomeSource();
  
  const { employees, income_types, active_month } = useAppData();
  console.log(active_month);
  const onIncomeAdded = (data: Income) => {
    addIncome(data);
  };

  return (
    <IncomesForm
      employees={employees}
      income_types={income_types}
      active_month={active_month.value}
      onSave={onIncomeAdded}
    />
  );
}
