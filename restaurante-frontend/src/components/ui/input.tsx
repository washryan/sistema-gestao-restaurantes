import * as React from "react";

// Removido o uso de uma interface desnecessariamente vazia
// Agora usamos apenas o React.InputHTMLAttributes diretamente

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
