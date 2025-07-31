import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
  Control,
} from "react-hook-form";

// input field props
export interface InputFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  isDisabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// Option type
export interface Option<T = string> {
  label: string;
  value: T;
}

// select props
export interface FormSelectProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  containerClass?: string;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  isDisabled?: boolean;
}

// checkbox props
export interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  icon?: React.ReactNode;
  errors?: FieldErrors<T>;
  labelClass?: string;
  containerClass?: string;
  checkboxClass?: string;
  isDisabled?: boolean;
}

// file upload
export interface FormImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  maxImages?: number;
  maxFileSizeMB?: number;
  label?: string;
}
