import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFieldProps } from "@/types/form.types";
import { FieldValues } from "react-hook-form";

const LInputField = <T extends FieldValues>({
  className,
  inputClass,
  registerName,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  isDisabled = false,
}: InputFieldProps<T>) => {
  const registerValueType = type === "number" ? { valueAsNumber: true } : {};

  const defaultInputClass =
    "flex w-full items-center self-stretch px-3 py-1.5 rounded-md border border-gray-400 bg-white";

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={registerName} className="mb-2">
          {label}
        </Label>
      )}
      <Input
        className={inputClass || defaultInputClass}
        type={type}
        step={type === "number" ? "any" : undefined}
        id={registerName}
        placeholder={placeholder}
        {...register(registerName, registerValueType)}
        disabled={isDisabled}
      />
      {errors?.[registerName] && (
        <p className="text-red-500 mt-1">
          {(errors[registerName] as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default LInputField;