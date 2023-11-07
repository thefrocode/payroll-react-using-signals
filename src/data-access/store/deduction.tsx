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
  createDeduction,
  deleteDeduction,
  fetchDeductions,
  updateDeduction,
} from "../api/deductions";
import { Deduction } from "../interfaces/deduction";

export function useDeductionSource(): {
  addDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  editDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  removeDeduction: UseMutateFunction<void, unknown, number, unknown>;
  error: unknown;
} {
  const { active_month } = useAppData();
  const queryClient = useQueryClient();

  const { deductions } = useAppData();

  const { data, error } = useQuery(
    ["deductions", { ...active_month.value }],
    fetchDeductions,
    {
      initialData: [],
    }
  );

  useEffect(() => {
    if (data) {
      deductions.value = data;
    }
  }, [data]);
  const  navigate  = useNavigate()
  const { mutate: addDeduction } = useMutation({
    mutationFn: createDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      toast({
        description: "Deduction Added Successfully",
      });
      navigate({
        to: "/deductions",
      })
    },
    onError: (error: { message: string }) => {
      toast({
        description: error?.message,
      });
    },
  });

  const { mutate: editDeduction } = useMutation({
    mutationFn: updateDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      
      toast({
        description: "Deduction Updated Successfully",
      });
      navigate({
        to: "/deductions",
      })
      
    },
  });
  const { mutate: removeDeduction } = useMutation({
    mutationFn: deleteDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      toast({
        description: "Deduction Deleted Successfully",
      });
    },
  });

  return {
    addDeduction,
    editDeduction,
    removeDeduction,
    error,
  };
}
