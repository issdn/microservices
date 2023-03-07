type SwitableContainerType = {
  [key: string]: React.ReactNode;
};

type SwitableContainerPropsType = {
  components: SwitableContainerType;
  currentlySelected: string;
};

const SwitchableContainer: React.FC<SwitableContainerPropsType> = ({
  components,
  currentlySelected,
}) => {
  return <>{components[currentlySelected]}</>;
};

export default SwitchableContainer;
