"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormSelectProps } from "./app-form.types";

const AppSelectItem = <T extends FieldValues, TValue = string>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  errors,
  parseValue = (val) => val as unknown as TValue,
  containerClass = "space-y-2",
  triggerClass = "w-full",
  labelClass,
  contentClass,
  itemClass,
  isDisabled = false,
}: FormSelectProps<T, TValue>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={containerClass}>
          {label && (
            <Label htmlFor={name} className={labelClass}>
              {label}
            </Label>
          )}
          <Select
            disabled={isDisabled}
            value={field.value !== undefined ? String(field.value) : ""}
            onValueChange={(val) => field.onChange(parseValue(val))}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClass}>
              {options.map((item, index) => (
                <SelectItem
                  key={index}
                  value={String(item.value)}
                  className={itemClass}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[name]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AppSelectItem;
