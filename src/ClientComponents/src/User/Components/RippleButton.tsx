import Spinner from "../../StandardComponents/Spinner";

type RippleButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading: boolean;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  attributes,
  loading,
}) => {
  const createRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    var rect = (e.target as HTMLElement).getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;

    circle.style.transform = "scale(0)";
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "rgba(255 255 255 / 0.3)";
    circle.style.pointerEvents = "none";

    circle.classList.add("animate-ripple");
    const ripple = button.getElementsByClassName("animate-ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <button
      {...attributes}
      disabled={loading}
      onClick={(e) => {
        createRipple(e);
        if (onClick) {
          onClick();
        }
      }}
      className="relative flex w-full flex-row justify-center overflow-hidden rounded-xl bg-violet-600 py-2 text-xl text-secondary drop-shadow-lg disabled:bg-violet-500"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default RippleButton;
