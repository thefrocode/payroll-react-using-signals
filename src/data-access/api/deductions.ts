import { Deduction } from "../../interfaces/deduction";
import axios from "axios";

//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchDeductions({ queryKey }: any): Promise<Deduction[]> {
  const [_key, { month, year }] = queryKey;
  try {
    const deductions = await axios.get("/deductions", { params: { month, year } });
    return deductions.data;
  } catch (e) {
    throw e;
  }
}

export async function createDeduction(data: Deduction) {
  try {
    const { amount, ...params } = data;
    const deduction = await axios.get("/deductions", { params });
    if (deduction.data.length === 0) {
      await axios.post("/deductions", { ...data });
    } else {
      throw new Error("Deduction already exists");
    }
  } catch (e) {
    throw e;
  }
}
export async function updateDeduction(data: Deduction) {
  try {
    await axios.patch(`/deductions/${data.id}`, { ...data });
  } catch (e) {
    throw e;
  }
}

export async function deleteDeduction(id: number) {
  try {
    await axios.delete(`/deductions/${id}`);
  } catch (e) {
    throw e;
  }
}
