import { Income } from "../../interfaces/income";
import axios from "axios";
import { ActiveMonth } from "../../interfaces/active-month";

//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchIncomes({queryKey}:any): Promise<Income[]> {
  const [_key, { month, year }] = queryKey
  try {
    const incomes = await axios.get("/incomes", { params: { month, year } });
    return incomes.data;
  } catch (e) {
    throw e;
  }
}

export async function createIncome(data: Income) {
  try {
    const { amount, ...params } = data;
    const income = await axios.get("/incomes", { params });
    if (income.data.length === 0) {
      await axios.post("/incomes", { ...data });
    } else {
      throw new Error("Income already exists");
    }
  } catch (e) {
    throw e;
  }
}
export async function updateIncome(data: Income) {
  try {
    await axios.patch(`/incomes/${data.id}`, { ...data });
  } catch (e) {
    throw e;
  }
}

export async function deleteIncome(id: number) {
  try {
    await axios.delete(`/incomes/${id}`);
  } catch (e) {
    throw e;
  }
}
