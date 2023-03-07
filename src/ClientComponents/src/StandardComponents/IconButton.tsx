import Icon, { IconProps } from "./Icon";
import { ButtonStyle, ButtonStyleType } from "./styles";

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
      className={`flex flex-col justify-center disabled:cursor-default ${ButtonStyle[type]} ${styles}`}
    >
      <Icon name={name} fill={fill} styles={styles} />
    </button>
  );
};

export default IconButton;
