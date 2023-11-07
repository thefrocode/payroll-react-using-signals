import axios from "axios";
import { Formula } from "../interfaces/formula";


//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchFormulas(): Promise<Formula[]> {
  try {
    const formulas = await axios.get("/formulas");
    return formulas.data;
  } catch (e) {
    throw e;
  }
}