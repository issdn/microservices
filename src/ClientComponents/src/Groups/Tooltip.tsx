type TooltipProps = {
  children: React.ReactNode;
  visible: boolean;
  styles?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  styles,
  visible = false,
}) => {
  return (
    <div
      style={{ display: visible ? "inline-block" : "none" }}
      className={`${styles} absolute transition-[display] duration-200 bg-neutral-900 break-words px-4 py-1 top-1/2 left-[100%] max-w-[16rem] rounded-md -translate-y-1/2 ml-4 font-mono text-secondary font-bold text-lg after:arrow`}
    >
      {children}
    </div>
  );
};

export default Tooltip;
