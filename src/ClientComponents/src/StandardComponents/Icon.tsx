export type IconProps = {
  name: string;
  fill?: boolean;
  styles?: string;
};

const Icon: React.FC<IconProps> = ({ name, fill = false, styles = "" }) => {
  return (
    <i className={`material-icons${fill ? "" : "-outlined"} ${styles}`}>
      {name}
    </i>
  );
};

export default Icon;
