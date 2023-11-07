import axios from "axios";
import { DeductionType } from "../interfaces/deduction-type";

//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchDeductionTypes(): Promise<DeductionType[]> {
  try {
    const deduction_types = await axios.get("/deduction_types");
    return deduction_types.data;
  } catch (e) {
    throw e;
  }
}


