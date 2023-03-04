export const Button = ({
  children,
  attributes,
}: {
  children: React.ReactNode;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
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
      onClick={createRipple}
      className="w-full disabled:bg-violet-500 relative py-2 overflow-hidden rounded-xl flex flex-row justify-center bg-violet-600 text-secondary text-xl drop-shadow-lg"
    >
      {children}
    </button>
  );
};
