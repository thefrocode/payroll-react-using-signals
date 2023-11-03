import { Employee } from "../interfaces/employee";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchEmployees(): Promise<Employee[]> {
  const employees = await axios.get("/employees");
  return employees.data;
}

export async function createEmployee(data: Employee) {
  await axios.post("/employees", { ...data });
}
export async function updateEmployee(data: Employee) {
  await axios.patch(`/employees/${data.id}`, { ...data });
}

export async function deleteEmployee(id: number) {
  await axios.delete(`/employees/${id}`);
}
