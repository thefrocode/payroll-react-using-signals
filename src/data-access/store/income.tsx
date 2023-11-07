import { useAppData } from "@/App";
import { toast } from "@/components/ui/use-toast";
import { Navigate, Router, useNavigate } from "@tanstack/react-location";
import {
  UseMutateFunction,
  useQueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import {
  createIncome,
  deleteIncome,
  fetchIncomes,
  updateIncome,
} from "../api/incomes";
import { Income } from "../interfaces/income";

export function useIncomeSource(): {
  addIncome: UseMutateFunction<void, unknown, Income, unknown>;
  editIncome: UseMutateFunction<void, unknown, Income, unknown>;
  removeIncome: UseMutateFunction<void, unknown, number, unknown>;
  error: unknown;
} {
  const { active_month } = useAppData();
  const queryClient = useQueryClient();

  const { incomes } = useAppData();

  const { data, error } = useQuery(
    ["incomes", { ...active_month.value }],
    fetchIncomes,
    {
      initialData: [],
    }
  );

  useEffect(() => {
    if (data) {
      incomes.value = data;
    }
  }, [data]);
  const  navigate  = useNavigate()
  const { mutate: addIncome } = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast({
        description: "Income Added Successfully",
      });
      navigate({
        to: "/incomes",
      })
    },
    onError: (error: { message: string }) => {
      toast({
        description: error?.message,
      });
    },
  });

  const { mutate: editIncome } = useMutation({
    mutationFn: updateIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      
      toast({
        description: "Income Updated Successfully",
      });
      navigate({
        to: "/incomes",
      })
      
    },
  });
  const { mutate: removeIncome } = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast({
        description: "Income Deleted Successfully",
      });
    },
  });

  return {
    addIncome,
    editIncome,
    removeIncome,
    error,
  };
}
