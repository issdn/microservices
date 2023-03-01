export type IconsProps = { name: string; fill?: boolean };

export default function Icon({ name, fill = false }: IconsProps) {
  return (
    <span className={`material-icons${fill ? "" : "-outlined"}`}>{name}</span>
  );
}
