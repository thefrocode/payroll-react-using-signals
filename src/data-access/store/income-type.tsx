import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIncomeTypes } from "../api/income-types";
import { IncomeType } from "../interfaces/income-type";


export function useIncomeTypeSource(): {
  income_types: IncomeType[];
  error: any;
} {
  const { data: income_types, error } = useQuery(
    ["income_types"],
    fetchIncomeTypes,
    {
      initialData: [],
    }
  );

  return { income_types, error };
}
