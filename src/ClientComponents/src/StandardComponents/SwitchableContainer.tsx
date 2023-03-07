type SwitableContainerType = {
  [key: string]: React.ReactNode;
};

type SwitableContainerProps = {
  components: SwitableContainerType;
  currentlySelected: string;
};

const SwitchableContainer: React.FC<SwitableContainerProps> = ({
  components,
  currentlySelected,
}) => {
  return <>{components[currentlySelected]}</>;
};

export default SwitchableContainer;
