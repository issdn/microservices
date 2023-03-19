import Spinner from "./Spinner";

type ButtonProps = {
  children: React.ReactNode;
  type?: keyof typeof types;
  loading: boolean;
  onClick?: () => void;
};

const types = {
  primary:
    "bg-neutral-900 hover:bg-neutral-700 text-secondary font-bold py-2 px-4 rounded-xl",
  secondary:
    "bg-secondary border border-neutral-900 hover:border-neutral-700 text-neutral-700 text-neutral-900 font-bold py-2 px-4 rounded-xl",
} as const;

const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  loading,
  onClick,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`${types[type]} flex w-full flex-row justify-center`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
