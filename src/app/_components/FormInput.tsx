"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <Label>{label}{required && " *"}</Label>
      <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
