import { Link, Outlet } from "@tanstack/react-location";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { UserCircle2 } from "lucide-react";
import { useEmployee } from "./data-access/store/employees-store";
import {
  User2Icon,
  HomeIcon,
  Users2Icon,
  CreditCardIcon,
  MinusIcon,
  LineChartIcon,
  SaveIcon,
} from "lucide-react";
import { Toaster } from "./components/ui/toaster";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-primary p-4 text-white row-span-6">
      <div className="flex flex-col gap-8">
        {/* Navbar content goes here */}
        <User2Icon className="h-16 w-16 text-center self-center" />
        <ul>
          <li>
            <Link to="/" className="flex flex-row gap-4 p-3">
              <HomeIcon /> Home
            </Link>
          </li>
          <li>
            <Link to="/employees" className="flex flex-row gap-4 px-2 py-3">
              <Users2Icon />
              Employees
            </Link>
          </li>
          <li>
            <Link to="/incomes" className="flex flex-row gap-4 px-2 py-3">
              <CreditCardIcon />
              Incomes
            </Link>
          </li>
          <li>
            <Link to="/deductions" className="flex flex-row gap-4 px-2 py-3">
              <MinusIcon />
              Deductions
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex flex-row gap-4 px-2 py-3">
              <LineChartIcon />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/saved_reports" className="flex flex-row gap-4 px-2 py-3">
              <SaveIcon />
              Saved Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
const TopBar = () => {
  const { filterEmployees } = useEmployee();
  return (
    <div className="sticky top-0 p-4">
      <div className="flex flex-row gap-4 justify-between mx-4">
        <Input
          className="w-[400px]"
          placeholder="Search"
          onChange={(e) => {
            filterEmployees(e.target.value);
          }}
        />
        <Button variant="outline" size="icon">
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
const MainView = () => {
  return (
    <main className="container mx-auto p-4 h-[calc(100vh-70px)]  overflow-y-auto">
      {/* Main content goes here */}
      <Outlet />
      <Toaster />
    </main>
  );
};

export function Home() {
  return (
    <div className="grid grid-cols-[210px,1fr] grid-rows-[70px,1fr] overflow-y-hidden">
      <Navbar />

      <TopBar />
      <MainView />
    </div>
  );
}
//grid-rows-[auto,1fr] min-h-screen
