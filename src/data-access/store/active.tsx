import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect } from "react";
import { createActiveMonth, fetchActiveMonth, updateActiveMonth } from "../api/shared";
import { ActiveMonth } from "../interfaces/active-month";


export function useSharedSource(): {
  active_month: ActiveMonth;
  closeMonth: ()=> void
} {
  const queryClient = useQueryClient();
  const { data: active_month, error } = useQuery(
    ["active_month"],
    fetchActiveMonth
  );

  const { mutate: addActiveMonth } = useMutation({
    mutationFn: createActiveMonth,
    onSuccess: () => {
      console.log("Active month set", active_month);
    },
    onError: (error) => {},
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

  const currentDate = new Date();
  useEffect(() => {
    if (!active_month) {
      addActiveMonth({
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
    }
  }, []);

  return { active_month, closeMonth };
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
