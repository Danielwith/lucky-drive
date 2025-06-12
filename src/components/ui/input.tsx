import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-violet-500 selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "",
        ghost: "bg-transparent border-0 shadow-none",
        filled: "bg-white dark:bg-input border border-input rounded-xs",
      },
      inputSize: {
        sm: "h-8 text-sm px-2 py-1",
        default: "h-9 text-base px-3 py-1",
        lg: "h-10 text-base px-4 py-2",
      },
      withIcon: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      withIcon: false,
    },
  }
);

type InputVariant = VariantProps<typeof inputVariants>["variant"];
type InputSize = VariantProps<typeof inputVariants>["inputSize"];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: InputVariant | null;
  inputSize?: InputSize | null;
  icon?: React.ReactNode;
  refProp?: React.RefObject<HTMLInputElement>; // ref como prop normal
}

function Input({
  className,
  variant,
  inputSize,
  type = "text",
  icon,
  refProp,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const showIcon = type === "password" || !!icon;
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        ref={refProp ?? undefined}
        data-slot="input"
        className={cn(
          inputVariants({
            variant,
            inputSize,
            withIcon: showIcon,
          }),
          className
        )}
        autoComplete={
          type === "password" ? "current-password" : props.autoComplete
        }
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-violet-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
      {showIcon && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-violet-500 focus:outline-none"
        >
          {icon}
        </button>
      )}
    </div>
  );
}

export { Input, inputVariants };
