import { useAppData } from "@/App";
import { useQuery} from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchIncomeTypes } from "../api/income-types";



export function useIncomeTypeSource(): {
  error: any;
} {
  const { income_types } = useAppData()
  const { data, error } = useQuery(
    ["income_types"],
    fetchIncomeTypes,
    {
      initialData: [],
    }
  );
  useEffect(()=>{
    console.log("useIncomeTypeSource", data)
    if(data){
      income_types.value = data
    }
  },[data])

  return {  error };
}
