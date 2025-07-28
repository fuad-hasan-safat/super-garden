import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

export interface InputFieldProps<T extends FieldValues = FieldValues> {
  registerName: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClass?: string
  isDisabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}