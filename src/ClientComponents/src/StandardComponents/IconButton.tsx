import Icon, { IconProps } from "./Icon";
export const ButtonStyle = {
  basic: "enabled:hover:bg-neutral-900 disabled:text-neutral-800",
  accent:
    "bg-neutral-800 enabled:hover:bg-neutral-700 disabled:text-neutral-700 disabled:hover:bg-neutral-700",
  clear: "",
  light:
    "text-neutral-400 enabled:hover:text-neutral-900 disabled:hover:text-neutral-400",
};

export type ButtonStyleType = keyof typeof ButtonStyle;

type IconButtonProps = IconProps & {
  onClick?: () => void;
  type?: ButtonStyleType;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProps> = ({
  name,
  fill = false,
  styles = "",
  type = "basic",
  attributes,
  onClick,
}) => {
  return (
    <button
      {...attributes}
      onClick={onClick}
      className={`flex flex-col justify-center transition-colors duration-300 disabled:cursor-default ${ButtonStyle[type]} ${styles}`}
    >
      <Icon name={name} fill={fill} styles={styles} />
    </button>
  );
};

export default IconButton;
