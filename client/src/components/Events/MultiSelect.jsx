import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "Sarah Chen", label: "Sarah Chen" },
  { value: "Nadeesha Perera", label: "Nadeesha Perera" },
  { value: "Kasun Fernando", label: "Kasun Fernando" },
  { value: "Jason Liu", label: "Jason Liu" },
  { value: "Ishara de Silva", label: "Ishara de Silva" },
];

function MultiSelect() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelectChange}
        value={selectedOptions}
      />
    </div>
  );
}

export default MultiSelect;
