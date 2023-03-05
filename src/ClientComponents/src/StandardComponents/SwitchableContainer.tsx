type SwitableContainerType = {
  [key: string]: React.ReactNode;
};

type SwitableContainerPropsType = {
  components: SwitableContainerType;
  currentlySelected: string;
};

export default function SwitchableContainer({
  components,
  currentlySelected,
}: SwitableContainerPropsType) {
  return <>{components[currentlySelected]}</>;
}
