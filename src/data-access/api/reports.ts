
import axios from "axios";
import { Report } from "../interfaces/report";
//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";

export async function fetchSavedReports({queryKey}: any): Promise<Report[]> {
  const [ _key, { employee_id,month, year } ] = queryKey
  try {
    const reports = await axios.get("/reports", { params: { employee_id,month, year } });
    return reports.data;
  } catch (e) {
    throw e;
  }
}

export async function createReport(data: Report) {
  try {
    await axios.post("/reports", { ...data });
  } catch (e) {
    throw e;
  }
}
export async function updateReport(data: Report) {
  try {
    await axios.patch(`/reports/${data.id}`, { ...data });
  } catch (e) {
    throw e;
  }
}

export async function deleteReport(id: number) {
  try {
    await axios.delete(`/reports/${id}`);
  } catch (e) {
    throw e;
  }
}
async function updateData(data: any) {
  try {
    const { employee_id, month, year } = data;
    const report = await axios.get("/reports", { params:{employee_id, month, year }});
    if (report.data.length !== 0) {
      const response = await axios.put(`/reports/${report.data[0].id}`, data);
    }else{
      const response = await axios.post(`/reports`, data);
    }
  } catch (error) {
    console.error(`Error updating data with ID ${data.id}:`, error);
  }
}

export async function updateBatchReports(reports: any[]) {
  const updatePromises = reports.map(updateData);
 
  try {
    await Promise.all(updatePromises);
    
  } catch (error) {
    
  }
}
