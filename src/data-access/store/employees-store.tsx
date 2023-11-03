import { useToast } from "@/components/ui/use-toast";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../api/employees";
import { Employee } from "../interfaces/employee";

function useEmployeeSource(): {
  employees: Employee[];
  no_of_employees?: number;
  addEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  editEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  removeEmployee: UseMutateFunction<void, unknown, number, unknown>;
  error: unknown;
  filterEmployees: (search: string) => void;
} {
  //Fetch all employees
  const { toast } = useToast()
  const queryClient = useQueryClient();
  const { data: employees, error } = useQuery(["employees"], fetchEmployees, {
    initialData: [],
  });

  //Generate mutations for updating the employee list
  const { mutate: addEmployee } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        description: "Employee Added Successfully",
      })
    },
  });
  const { mutate: editEmployee } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        description: "Employee Edited Successfully",
      })
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

  const [filter, setFilter] = useState("");

  const filteredEmployees = useMemo(() => {
    if (filter) {
      const filteredEmployees = employees.filter((employee: Employee) => {
        return (
          employee.branch.toLowerCase().includes(filter.toLowerCase()) ||
          employee.department.toLowerCase().includes(filter.toLowerCase())
        );
      });
      return filteredEmployees;
    } else {
      return employees;
    }
  }, [employees, filter]);

  const filterEmployees = useCallback(
    (search: string) => {
      setFilter(search);
    },
    [setFilter]
  );

  return {
    employees: filteredEmployees,
    no_of_employees: employees?.length,
    addEmployee,
    editEmployee,
    removeEmployee,
    error,
    filterEmployees,
  };
}
const EmployeesContext = createContext<ReturnType<typeof useEmployeeSource>>(
  {} as unknown as ReturnType<typeof useEmployeeSource>
);

export function useEmployee() {
  return useContext(EmployeesContext);
}
export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmployeesContext.Provider value={useEmployeeSource()}>
      {children}
    </EmployeesContext.Provider>
  );
}
