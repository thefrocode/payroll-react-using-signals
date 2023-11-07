import { useAppData } from "@/App";
import { useQuery} from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchDeductionTypes } from "../api/deduction-types";



export function useDeductionTypeSource(): {
  error: any;
} {
  const { deduction_types } = useAppData()
  const { data, error } = useQuery(
    ["deduction_types"],
    fetchDeductionTypes,
    {
      initialData: [],
    }
  );
  useEffect(()=>{
    console.log("useDeductionTypeSource", data)
    if(data){
      deduction_types.value = data
    }
  },[data])

  return {  error };
}
