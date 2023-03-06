export type IconPropsType = {
  name: string;
  fill?: boolean;
  styles?: string;
};

export default function Icon({
  name,
  fill = false,
  styles = "",
}: IconPropsType) {
  return (
    <i className={`material-icons${fill ? "" : "-outlined"} ${styles}`}>
      {name}
    </i>
  );
}
