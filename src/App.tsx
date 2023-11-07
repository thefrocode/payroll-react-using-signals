import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { routes } from "./routes";
import { createContext, useContext } from "react";
import { computed, Signal, signal } from "@preact/signals-react";
import { Employee } from "./data-access/interfaces/employee";
import { Income } from "./data-access/interfaces/income";
import { IncomeType } from "./data-access/interfaces/income-type";
import { ActiveMonth } from "./data-access/interfaces/active-month";
import { DeductionType } from "./data-access/interfaces/deduction-type";
import { Deduction } from "./data-access/interfaces/deduction";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5,
    },
  },
});
export function useAppSource() {
  const currentDate = new Date();
  //const active_month:Signal<ActiveMonth> = signal({month:currentDate.getMonth()+ 1, year:currentDate.getFullYear()});
  const active_month:Signal<ActiveMonth> = signal({});
  const employees: Signal<Employee[]> = signal([]);
  const filter = signal("");

  const filteredEmployees = computed(() => {
    if (!employees.value) return [];
    if (!filter.value) return employees.value;
    return employees.value.filter(
      (employee) =>
        employee.branch.toLowerCase().includes(filter.value.toLowerCase()) ||
        employee.department.toLowerCase().includes(filter.value.toLowerCase())
    );
    
  });
  const income_types: Signal<IncomeType[]> = signal([]);

  const incomes:Signal<Income[]> = signal([]);

  const totalIncome = computed(() => {
    return incomes.value.reduce((total, income) => {
      return total + income.amount;
    }, 0);
  });

  const detailedIncomes = computed(() => {
    console.log("Income Types", income_types.value);
    return incomes.value.map((income) => {
      const employee = employees.value?.find(
        (employee) => employee.id === income.employee_id
      );
      const income_type = income_types.value.find(
        (income_type) => income_type.id === income.income_type_id
      );
      return {
        ...income,
        employee_name: employee?(employee?.first_name + " " + employee?.last_name):undefined,
        income_type_name: income_type?.name,
        income_type_code: income_type?.code,
      };
    }).filter((employee)=>employee.employee_name);
  });

  const deduction_types: Signal<DeductionType[]> = signal([]);
  const deductions:Signal<Deduction[]> = signal([]);
  
  const detailedDeductions = computed(() => {
    return deductions.value.map((deduction) => {
      const employee = employees.value?.find(
        (employee) => employee.id === deduction.employee_id
      );
      const deduction_type = deduction_types.value.find(
        (deduction_type) => deduction_type.id === deduction.deduction_type_id
      );
      return {
        ...deduction,
        employee_name: employee?(employee?.first_name + " " + employee?.last_name): undefined,
        deduction_type_name: (deduction_type?.name),
        deduction_type_code: (deduction_type?.code),
      };
    }).filter((employee)=>employee.employee_name);
  });

  const reports = signal([]);


  return {
    active_month,
    employees,
    filter,
    filteredEmployees,
    income_types,
    incomes,
    totalIncome,
    detailedIncomes,
    deductions,
    deduction_types,
    detailedDeductions,
    reports
  };
}

const AppContext = createContext<ReturnType<typeof useAppSource>>(
  {} as unknown as ReturnType<typeof useAppSource>
);

export function useAppData() {
  return useContext(AppContext);
}
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={useAppSource()}>{children}</AppContext.Provider>
  );
}
const location = new ReactLocation();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router location={location} routes={routes}>
            <div>
              <Outlet />
            </div>
          </Router>
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
