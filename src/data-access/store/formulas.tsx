import { useAppData } from "@/App";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { fetchFormulas } from "../api/formulas";


export function useFormulasSource() {
  
  const { formulas } = useAppData();
  const { data, error } = useQuery(["formulas"], fetchFormulas, {
    initialData: [],
  });
  useEffect(()=>{
    if(data){
      formulas.value = data
    }
  },[data])
 

  return { error };
}
