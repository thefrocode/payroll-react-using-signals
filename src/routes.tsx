import { Home } from "./home";
import { Index } from "./pages";
import { EmployeesAdd } from "./pages/employees/employees-add";
import { EmployeesEdit } from "./pages/employees/employees-edit";
import { EmployeesList } from "./pages/employees/employees-list";

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
];
