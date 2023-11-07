import { useAppData } from "@/App";
import { DeductionsForm } from "@/components/deductions/deductions-form";
import { useDeductionSource } from "@/data-access/store/deduction";
import { useMatch } from "@tanstack/react-location";

export function DeductionsEdit() {
  const {
    params: { id },
  } = useMatch();
  const { deductions, employees, deduction_types } = useAppData();

  const { editDeduction } = useDeductionSource();

  const deduction = deductions.value.find((deduction) => deduction.id === +id);

  const onDeductionEdited = (data: any) => {
    editDeduction({ ...data, id: +id });
  };

  return (
    <DeductionsForm
      deduction={deduction}
      onSave={onDeductionEdited}
      employees={employees}
      deduction_types={deduction_types}
    />
  );
}
