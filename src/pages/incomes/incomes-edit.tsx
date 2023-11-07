import { useAppData } from "@/App";
import { IncomesForm } from "@/components/incomes/incomes-form";
import { useIncomeSource } from "@/data-access/store/income";
import { useMatch } from "@tanstack/react-location";

export function IncomesEdit() {
  const {
    params: { id },
  } = useMatch();
  const { incomes, employees, income_types } = useAppData();

  const { editIncome } = useIncomeSource();

  const income = incomes.value.find((income) => income.id === +id);

  const onIncomeEdited = (data: any) => {
    editIncome({ ...data, id: +id });
  };

  return (
    <IncomesForm
      income={income}
      onSave={onIncomeEdited}
      employees={employees}
      income_types={income_types}
    />
  );
}
