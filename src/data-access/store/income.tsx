import { UseMutateFunction, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { createIncome, deleteIncome, fetchIncomes, updateIncome } from "../api/incomes";
import { DetailedIncome, Income } from "../interfaces/income";
import { useShared } from "./active";
import { useEmployee } from "./employees-store";
import { useIncomeTypeSource } from "./income-type";


export function useIncomeSource(): {
  incomes: Income[];
  total_income: number;
  addIncome: UseMutateFunction<void, unknown, Income, unknown>;
  editIncome: UseMutateFunction<void, unknown, Income, unknown>;
  removeIncome: UseMutateFunction<void, unknown, number, unknown>;
  error: unknown;
  detailed_incomes: DetailedIncome[];
} {
  const { active_month } = useShared();
  const queryClient = useQueryClient();

  
  const { data: incomes, error } = useQuery(
    ["incomes",{...active_month}],
    fetchIncomes,
    {
      initialData: [],
    }
  );
  const { mutate: addIncome } = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Added");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const { mutate: editIncome } = useMutation({
    mutationFn: updateIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Updated");
    },
  });
  const { mutate: removeIncome } = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Deleted");
    },
  });

  const { employees } = useEmployee();
  const { income_types } = useIncomeTypeSource();

  const total_income = useMemo(() => {
    return incomes.reduce((total, income) => {
      return total + income.amount;
    }, 0);
  }, [incomes]);

  const { detailed_incomes } = useMemo(() => {
    const detailed_incomes = incomes.map((income) => {
      const employee = employees?.find(
        (employee) => employee.id === income.employee_id
      );
      const income_type = income_types.find(
        (income_type) => income_type.id === income.income_type_id
      );
      return {
        ...income,
        employee_name: employee?(employee?.first_name + " " + employee?.last_name):undefined,
        income_type_name: income_type?.name!,
        income_type_code: income_type?.code!,
      };
    }).filter((employee)=>employee.employee_name);

    return { detailed_incomes };
  }, [incomes, employees, income_types]);

  return {
    incomes,
    total_income,
    addIncome,
    editIncome,
    removeIncome,
    error,
    detailed_incomes,
  };
}
