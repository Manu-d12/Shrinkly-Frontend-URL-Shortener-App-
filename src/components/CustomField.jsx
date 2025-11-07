import React from "react";
import { Controller } from "react-hook-form";

const CustomField = ({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
  rules = {},
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {rules?.required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`border rounded-xl px-3 py-2 text-sm outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150
                ${error ? "border-red-500" : "border-gray-300"}
                ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
              `}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CustomField;
