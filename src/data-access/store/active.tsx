import { useAppData } from "@/App";
import { useSignalEffect } from "@preact/signals-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect } from "react";
import { createActiveMonth, fetchActiveMonth, updateActiveMonth } from "../api/shared";
import { ActiveMonth } from "../interfaces/active-month";


export function useSharedSource(): {
  active_month: ActiveMonth;
  closeMonth: ()=> void
} {
  const queryClient = useQueryClient();
  const { active_month } = useAppData();

  // useSignalEffect(()=>{
  //   console.log("active_month", active_month)
  //   addActiveMonth(active_month.value)
  // })
  const { data, error } = useQuery(
    ["active_month"],
    fetchActiveMonth
  );
  const currentDate = new Date();
  useEffect(() => {
    console.log("active_month", data);
    if (data) {
      active_month.value = data;
      if(Object.keys(data).length === 0){
        console.log("active_month not defined", data);
        addActiveMonth({
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        });
      }
    } 

  }, [data]);

  const { mutate: addActiveMonth } = useMutation({
    mutationFn: createActiveMonth,
    onSuccess: (result,variables) => {
      console.log("active_month_success", variables);
      active_month.value = variables;
    },
    onError: (error) => {
      console.log("active_month", error);
    },
  });
  const { mutate: editActiveMonth } = useMutation({
    mutationFn: updateActiveMonth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active_month"] });
      alert("Month Closed Successfull");
    },
    onError: (error) => {},
  });

  const closeMonth = useCallback(() => {
    editActiveMonth();
  }, []);

  // const currentDate = new Date();
  // useEffect(() => {
  //   if (!active_month) {
  //     addActiveMonth({
  //       month: currentDate.getMonth() + 1,
  //       year: currentDate.getFullYear(),
  //     });
  //   }
  // }, []);

  return { closeMonth };
}
const ActiveContext = createContext<ReturnType<typeof useSharedSource>>(
  {} as unknown as ReturnType<typeof useSharedSource>
);

export function useShared() {
  return useContext(ActiveContext);
}
export function ActiveProvider({ children }: { children: React.ReactNode }) {
  return (
    <ActiveContext.Provider value={useSharedSource()}>
      {children}
    </ActiveContext.Provider>
  );
}
