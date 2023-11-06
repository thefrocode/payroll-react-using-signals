import { useForm } from "react-hook-form";

export function IncomesForm(props: any) {
  const { income, onSave, employees, income_types, active_month } = props;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    onSave({ ...data, ...active_month });
  };
  

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-1/2 mx-auto"
    >
      <select
        {...register("employee_id", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Employee</option>
        {employees &&
          employees.map((employee: any) => {
            return (
              <option
                key={employee.id}
                value={employee.id}
                selected={employee.id === income?.employee_id}
              >
                {employee.first_name} {employee.second_name}
              </option>
            );
          })}
      </select>
      {errors.employee_id && <span>This field is required</span>}

      <select
        {...register("income_type_id", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Income Type</option>
        {income_types.map((income_type: any) => {
          return (
            <option
              key={income_type.id}
              value={income_type.id}
              selected={income_type.id === income?.income_type_id}
            >
              {income_type.name}
            </option>
          );
        })}
      </select>
      {errors.income_type_id && <span>This field is required</span>}

      <input
        placeholder="Amount"
        defaultValue={income?.amount}
        {...register("amount", { required: true, valueAsNumber: true })}
      />

      {errors.amount && <span>This field is required</span>}

      <input type="submit" className="submit" />
    </form>
  );
}
