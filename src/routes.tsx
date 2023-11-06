import { Home } from "./home";
import { Index } from "./pages";
import { EmployeesAdd } from "./pages/employees/employees-add";
import { EmployeesEdit } from "./pages/employees/employees-edit";
import { EmployeesList } from "./pages/employees/employees-list";
import { IncomesAdd } from "./pages/incomes/incomes-add";
import { IncomesEdit } from "./pages/incomes/incomes-edit";
import { IncomesList } from "./pages/incomes/incomes-list";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
    ],
  },
  {
    path: "/employees",
    element: <Home />,
    children: [
      {
        path: "/",
        element: (
          <>
            <EmployeesList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <EmployeesEdit />,
      },
      {
        path: "/add",
        element: <EmployeesAdd />,
      },
    ],
  },
  {
    path: "/incomes",
    element: <Home />,
    children: [
      {
        path: "/",
        element: (
          <>
            <IncomesList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <IncomesEdit />,
      },
      {
        path: "/add",
        element: <IncomesAdd />,
      },
    ],
  },
];
