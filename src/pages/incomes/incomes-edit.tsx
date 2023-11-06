import { IncomesForm } from "@/components/incomes/incomes-form";
import { useEmployee } from "@/data-access/store/employees-store";
import { useIncomeSource } from "@/data-access/store/income";
import { useIncomeTypeSource } from "@/data-access/store/income-type";
import { useMatch } from "@tanstack/react-location";


export function IncomesEdit() {
  const {
    params: { id },
  } = useMatch();
  const { incomes, editIncome } = useIncomeSource();
  const { employees } = useEmployee();
  const { income_types } = useIncomeTypeSource();

  const income = incomes.find((income) => income.id === +id);

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
