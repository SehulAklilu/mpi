import * as React from "react";
import clsx from "clsx"; // Using clsx for class name concatenation

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ElementType; // Accept React component for startIcon
  endIcon?: React.ElementType; // Optional endIcon support
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      startIcon: StartIcon,
      endIcon: EndIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {/* Input */}
        <input
          type={type}
          ref={ref}
          className={clsx(
            "peer flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            StartIcon && "pl-10", // Add padding for start icon
            EndIcon && "pr-10", // Add padding for end icon
            className
          )}
          {...props}
        />

        {/* Start Icon */}
        {StartIcon && (
          <StartIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-900" />
        )}

        {/* End Icon */}
        {EndIcon && (
          <EndIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-900" />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
