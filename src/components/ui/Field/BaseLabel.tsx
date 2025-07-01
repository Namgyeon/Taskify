const BaseLabel = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <label
      htmlFor={id}
      className="text-lg font-normal text-[var(--black-333236)]"
    >
      {children}
    </label>
  );
};

export default BaseLabel;
