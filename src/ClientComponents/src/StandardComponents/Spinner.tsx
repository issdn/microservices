type SpinnerProps = {
  size?: keyof typeof sizes;
};

const sizes = {
  sm: "w-6 h-6 border-2 border-b-2",
  md: "w-8 h-8 border-4 border-b-4",
  lg: "w-12 h-12 border-4 border-b-4",
  xl: "w-16 h-16 border-8 border-b-8",
};

const Spinner: React.FC<SpinnerProps> = ({ size = "md" }) => {
  return (
    <div
      className={`${sizes[size]} border-gray-300/50 border-b-gray-500/10 rounded-full animate-spin`}
    />
  );
};

export default Spinner;
