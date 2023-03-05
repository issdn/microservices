import { useState } from "react";

type OptionsType = {
  [key: string]: { label: string; onClick: () => void };
};

type SwitchPropsType = {
  options: OptionsType;
};

const useSwitch = (options: OptionsType) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSwitch = (name: string) => {
    setSelected(options[name]);
  };

  return {
    selected,
    handleSwitch,
  };
};

export default function Switch({ options }: SwitchPropsType) {
  return (
    <div>
      {Object.values(options).map((option) => (
        <button
          key={option.label}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={option.onClick}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
