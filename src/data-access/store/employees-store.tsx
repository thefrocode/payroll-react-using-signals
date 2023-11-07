import { useAppData } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useEffect } from "react";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../api/employees";
import { Employee } from "../interfaces/employee";

export function useEmployee(): {
  addEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  editEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  removeEmployee: UseMutateFunction<void, unknown, number, unknown>;
  error: unknown;
} {
  //Fetch all employees
  console.log("useEmployee");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { employees } = useAppData();
  const { data, error } = useQuery(["employees"], fetchEmployees, {
    initialData: [],
  });

  useEffect(() => {
    employees.value = data;
  }, [data]);

  //Generate mutations for updating the employee list
  const { mutate: addEmployee } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        description: "Employee Added Successfully",
      });
    },
  });
  const { mutate: editEmployee } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        description: "Employee Edited Successfully",
      });
    },
  });
  const { mutate: removeEmployee } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      alert("Employee Deleted");
    },
  });

  return {
    addEmployee,
    editEmployee,
    removeEmployee,
    error,
  };
}


