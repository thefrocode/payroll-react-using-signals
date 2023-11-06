import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { routes } from "./routes";
import { createContext, useContext } from "react";
//import { EmployeesProvider } from "./data-access/store/employees-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5,
    },
  },
});
function useAppSource(){

}

const AppContext = createContext<ReturnType<typeof useAppSource>>(
  {} as unknown as ReturnType<typeof useAppSource>
);

export function useAppData() {
  return useContext(AppContext);
}
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={useAppSource()}>
      {children}
    </AppContext.Provider>
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
