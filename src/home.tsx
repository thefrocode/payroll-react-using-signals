import { Link, Outlet } from "@tanstack/react-location";
import { useEmployee } from "./data-access/store/employees-store";


const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-blue-500 p-4 text-white row-span-6">
      <div className="container mx-auto flex flex-column">
        {/* Navbar content goes here */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/incomes">Incomes</Link>
          </li>
          <li>
            <Link to="/deductions">Deductions</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/saved_reports">Saved Reports</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
const TopBar = () => {
  const { filterEmployees } = useEmployee();
  return (
    <div className="sticky top-0 bg-gray-200 p-4">
      <div className="container mx-auto">
        {/* Top bar content goes here */}
        <input
          placeholder="Search"
          onChange={(e) => {
            filterEmployees(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
const MainView = () => {
  return (
    <main className="container mx-auto p-4 h-[calc(100vh-70px)]  overflow-y-auto">
      {/* Main content goes here */}
      <Outlet />
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
