import { useAppData } from "@/App";
import { DeductionsForm } from "@/components/deductions/deductions-form";
import { Deduction } from "@/data-access/interfaces/deduction";
import { useShared } from "@/data-access/store/active";
import { useDeductionSource } from "@/data-access/store/deduction";

export function DeductionsAdd() {
  const { addDeduction } = useDeductionSource();
  
  const { employees, deduction_types, active_month } = useAppData();
  console.log(active_month);
  const onDeductionAdded = (data: Deduction) => {
    addDeduction(data);
  };

  return (
    <DeductionsForm
      employees={employees}
      deduction_types={deduction_types}
      active_month={active_month.value}
      onSave={onDeductionAdded}
    />
  );
}
