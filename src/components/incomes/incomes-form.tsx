import { Employee } from "@/data-access/interfaces/employee";
import { IncomeType } from "@/data-access/interfaces/income-type";
import { Label } from "@radix-ui/react-label";
import { SelectGroup } from "@radix-ui/react-select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  employee_id: z
    .string({
      required_error: "Please select an employee.",
    }),
  income_type_id: z.string({
    required_error: "Please select an income type.",
  }),
  amount: z.string({
    required_error: "Please enter an amount.",
  }),
});

export function IncomesForm(props: any) {
  const { income, onSave, employees, income_types, active_month } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee_id: income?.employee_id.toString(),
      income_type_id: income?.income_type_id.toString(),
      amount: income?income?.amount.toString():'0',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    onSave({  ...active_month, employee_id: parseInt(data.employee_id), income_type_id: parseInt(data.income_type_id), amount: parseInt(data.amount) });
  }

  return (
    <Form {...form}>
      <h1 className="text-2xl font-bold text-center">Add Income</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-1/2 mx-auto gap-4">
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value="2">Apples</SelectItem> */}
                  {employees.value &&
                    employees.value.map((employee: Employee) => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.first_name} {employee.last_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="income_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an income type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value="2">Apples</SelectItem> */}
                  {income_types.value &&
                    income_types.value.map((income_type: IncomeType) => (
                      <SelectItem key={income_type.id} value={income_type.id.toString()}>
                        {income_type.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
