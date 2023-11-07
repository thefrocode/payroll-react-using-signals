import { Home } from "./home";
import { Index } from "./pages";
import { DeductionsAdd } from "./pages/deductions/deductions-add";
import { DeductionsEdit } from "./pages/deductions/deductions-edit";
import { DeductionsList } from "./pages/deductions/deductions-list";
import { EmployeesAdd } from "./pages/employees/employees-add";
import { EmployeesEdit } from "./pages/employees/employees-edit";
import { EmployeesList } from "./pages/employees/employees-list";
import { IncomesAdd } from "./pages/incomes/incomes-add";
import { IncomesEdit } from "./pages/incomes/incomes-edit";
import { IncomesList } from "./pages/incomes/incomes-list";
import { ReportsList } from "./pages/reports/reports-list";
import { ReportsNHIF } from "./pages/reports/reports-nhif";
import { ReportsNSSF } from "./pages/reports/reports-nssf";

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
  {
    path: "/deductions",
    element: <Home />,
    children: [
      {
        path: "/",
        element: (
          <>
            <DeductionsList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <DeductionsEdit />,
      },
      {
        path: "/add",
        element: <DeductionsAdd />,
      },
    ],
  },
  {
    path: "/reports",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <ReportsList />,
      },
      {
        path: "/nhif",
        element: <ReportsNHIF />,
      },
      {
        path: "/nssf",
        element: <ReportsNSSF />,
      },
    ],
  },
];
