export interface Income {
  id?: number;
  employee_id: number;
  income_type_id: number;
  amount: number;
  month: number;
  year: number;
}
export const TIncome = {
  id: "",
  employee_id: "",
  income_type_id: "",
  amount: "",
  month: "",
  year: "",
};
export interface DetailedIncome extends Income {
  employee_name?: string;
  income_type_name: string;
  income_type_code: string;
}
type PartialDetailedIncome = Partial<DetailedIncome>;

export const TDetailedIncome: PartialDetailedIncome = {
  employee_name: "",
  income_type_name: "",
  amount: 0,
  month: 0,
  year: 0,
};
