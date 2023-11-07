export interface Deduction {
  id?: number;
  employee_id: number;
  deduction_type_id: number;
  amount: number;
  month: number;
  year: number;
}
export const TDeduction = {
  id: "",
  employee_id: "",
  deduction_type_id: "",
  amount: "",
  month: "",
  year: "",
};
export interface DetailedDeduction extends Deduction {
  employee_name?: string;
  deduction_type_name: string;
  deduction_type_code: string;
}
type PartialDetailedDeduction = Partial<DetailedDeduction>;

export const TDetailedDeduction: PartialDetailedDeduction = {
  employee_name: "",
  deduction_type_name: "",
  amount: 0,
  month: 0,
  year: 0,
};
