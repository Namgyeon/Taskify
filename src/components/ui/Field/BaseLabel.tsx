const BaseLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="text-lg font-normal text-[var(--black-333236)]">
      {children}
    </label>
  );
};

export default BaseLabel;
