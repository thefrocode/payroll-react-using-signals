import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export function EmployeesForm(props: any) {
  const { employee, onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => onSave(data);

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Add Employee</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/2 mx-auto gap-4"
      >
        <div className="flex flex-col gap-1">
          <Label>First Name</Label>
          <Input
            placeholder="First Name"
            defaultValue={employee?.first_name}
            {...register("first_name", {
              required: true,
            })}
          />
          {errors.first_name && <span className="text-destructive">This field is required</span>}
        </div>

        <div>
          <Label>Last Name</Label>

          <Input
            placeholder="Last Name"
            defaultValue={employee?.last_name}
            {...register("last_name", { required: true })}
          />

          {errors.last_name && <span className="text-destructive">This field is required</span>}
        </div>
        <div>
          <Label>ID Number</Label>
          <Input
            placeholder="ID Number"
            defaultValue={employee?.id_number}
            {...register("id_number", { required: true })}
          />

          {errors.id_number && <span className="text-destructive">This field is required</span>}
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input
            placeholder="Phone Number"
            defaultValue={employee?.phone}
            {...register("phone", { required: true })}
          />

          {errors.phone && <span className="text-destructive">This field is required</span>}
        </div>
        <div>
          <Label>Email Address</Label>
          <Input
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
            <small className="text-destructive">Email is required</small>
          )}

          {errors.email_address?.type === "matchPattern" && (
            <small className="text-destructive">Email address must be a valid address</small>
          )}
        </div>
        <div>
          <Label>NHIF Number</Label>
          <Input
            placeholder="NHIF Number"
            defaultValue={employee?.nhif_number}
            {...register("nhif_number", { required: true })}
          />

          {errors.nhif_number && <span className="text-destructive">This field is required</span>}
        </div>
        <div>
          <Label>Branch</Label>
          <Input
            placeholder="Branch"
            defaultValue={employee?.branch}
            {...register("branch", {
              required: true,
            })}
          />
          {errors.branch && <span className="text-destructive">This field is required</span>}
        </div>
        <div>
          <Label>Department</Label>
          <Input
            placeholder="Department"
            defaultValue={employee?.department}
            {...register("department", {
              required: true,
            })}
          />
          {errors.department && <span className="text-destructive">This field is required</span>}
        </div>
        <Button asChild>
          <input type="submit" className="submit" value="Add Employee"/>
        </Button>
      </form>
    </>
  );
}
