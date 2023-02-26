interface FormProps {
  onSubmit: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  className,
  children,
}) => {
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
