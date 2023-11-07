import axios from "axios";
import { IncomeType } from "../interfaces/income-type";

//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchIncomeTypes(): Promise<IncomeType[]> {
  try {
    const income_types = await axios.get("/income_types");
    return income_types.data;
  } catch (e) {
    throw e;
  }
}


