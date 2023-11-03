import { useForm } from "react-hook-form";

export function EmployeesForm(props: any) {
  const { employee, onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => onSave(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-1/2 mx-auto"
    >
      <input
        placeholder="First Name"
        defaultValue={employee?.first_name}
        {...register("first_name", {
          required: true,
        })}
      />
      {errors.first_name && <span>This field is required</span>}

      <input
        placeholder="Last Name"
        defaultValue={employee?.last_name}
        {...register("last_name", { required: true })}
      />

      {errors.last_name && <span>This field is required</span>}

      <input
        placeholder="ID Number"
        defaultValue={employee?.id_number}
        {...register("id_number", { required: true })}
      />

      {errors.id_number && <span>This field is required</span>}

      <input
        placeholder="Phone Number"
        defaultValue={employee?.phone}
        {...register("phone", { required: true })}
      />

      {errors.phone && <span>This field is required</span>}

      <input
        placeholder="Email Address"
        defaultValue={employee?.email_address}
        {...register("email_address", {
          required: true,
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        })}
      />

      {errors.email_address?.type === "required" && (
        <small>Email is required</small>
      )}

      {errors.email_address?.type === "matchPattern" && (
        <small>Email address must be a valid address</small>
      )}

      <input
        placeholder="NHIF Number"
        defaultValue={employee?.nhif_number}
        {...register("nhif_number", { required: true })}
      />

      {errors.nhif_number && <span>This field is required</span>}

      <input
        placeholder="Branch"
        defaultValue={employee?.branch}
        {...register("branch", {
          required: true,
        })}
      />
      {errors.branch && <span>This field is required</span>}
      <input
        placeholder="Department"
        defaultValue={employee?.department}
        {...register("department", {
          required: true,
        })}
      />
      {errors.department && <span>This field is required</span>}

      <input type="submit" className="submit"/>
    </form>
  );
}
