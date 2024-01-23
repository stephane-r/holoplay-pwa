import type { FC, ReactNode } from "react";

interface FormProps {
  label?: string;
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

export const Form: FC<FormProps> = ({
  label,
  onSubmit,
  className,
  children,
}) => {
  return (
    <form
      aria-label={label}
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};
