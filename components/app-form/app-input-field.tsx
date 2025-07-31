import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import { InputFieldProps } from "./app-form.types";

const AppInputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  isDisabled = false,
  containerClass,
  inputClass,
  labelClass,
}: InputFieldProps<T>) => {
  const registerValueType = type === "number" ? { valueAsNumber: true } : {};

  const defaultInputClass =
    "flex w-full items-center self-stretch px-3 py-1.5 rounded-md border border-gray-400 bg-white";

  return (
    <div className={containerClass}>
      {label && (
        <Label htmlFor={name} className={cn("mb-2", labelClass)}>
          {label}
        </Label>
      )}
      <Input
        className={inputClass || defaultInputClass}
        type={type}
        step={type === "number" ? "any" : undefined}
        id={name}
        placeholder={placeholder}
        {...register(name, registerValueType)}
        disabled={isDisabled}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default AppInputField;
