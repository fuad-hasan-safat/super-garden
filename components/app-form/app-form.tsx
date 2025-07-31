/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

type LivanaFormProps<T extends FieldValues> = {
  schema: ZodType<T, any, any>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  defaultValues?: DefaultValues<T>;
  className?: string;
};

export const AppForm = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
}: LivanaFormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
};
