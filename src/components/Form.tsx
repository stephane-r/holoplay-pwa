import type { FC, ReactNode } from "react";

interface FormProps {
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

export const Form: FC<FormProps> = ({ onSubmit, className, children }) => {
  return (
    <form
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
