import { useState } from "react";

type OptionsType = {
  [key: string]: { label: string; onClick: () => void };
};

export const useSwitch = (options: OptionsType, startingSelected: string) => {
  if (!options[startingSelected]) {
    if (Object.keys(options).includes(startingSelected.toLowerCase())) {
      throw new Error("The startingSelected is case-sensitive.");
    }
    throw new Error(
      `The startingSelected option ${startingSelected} is not part of the options object.`
    );
  }
  const [selected, setSelected] = useState(options[startingSelected]);

  const handleSwitch = (name: string) => {
    setSelected(options[name]);
  };

  return {
    selected,
    handleSwitch,
  };
};

type SwitchProps = {
  options: OptionsType;
  selected: ReturnType<typeof useSwitch>["selected"];
  handleSwitch: ReturnType<typeof useSwitch>["handleSwitch"];
};

const Switch: React.FC<SwitchProps> = ({ options, selected, handleSwitch }) => {
  return (
    <div className="p-1.5 bg-secondary rounded-3xl drop-shadow-md text-secondary">
      <div className="flex flex-row gap-x-1 rounded-3xl shadow-neo-1">
        {Object.values(options).map((option) => (
          <button
            key={option.label}
            className={`${
              selected.label === option.label
                ? "bg-violet-600 shadow-neo-1-violet"
                : "text-violet-600 hover:text-violet-500 shadow-neo-1"
            }  rounded-3xl font-bold py-2 px-4 flex flex-row items-center justify-center`}
            onClick={() => handleSwitch(option.label)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Switch;
