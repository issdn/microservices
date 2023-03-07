import Icon, { IconPropsType } from "./Icon";
import { ButtonStyle, ButtonStyleType } from "./styles";

type IconButtonPropsType = IconPropsType & {
  onClick?: () => void;
  type?: ButtonStyleType;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonPropsType> = ({
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
