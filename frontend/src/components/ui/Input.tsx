import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          ref={ref}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
