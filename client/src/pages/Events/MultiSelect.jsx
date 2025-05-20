import Select from "react-select";

// const options = [
//   { value: "Sarah Chen", label: "Sarah Chen" },
//   { value: "Nadeesha Perera", label: "Nadeesha Perera" },
//   { value: "Kasun Fernando", label: "Kasun Fernando" },
//   { value: "Jason Liu", label: "Jason Liu" },
//   { value: "Ishara de Silva", label: "Ishara de Silva" },
// ];

function MultiSelect({ selectedOptions, onChange, options }) {
  // Convert array of strings (['Marketing', 'IT']) to array of {value, label}
  const selectedValues = options.filter((option) =>
    selectedOptions.includes(option.value)
  );

  return (
    <Select
      isMulti
      options={options}
      value={selectedValues}
      onChange={onChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}

export default MultiSelect;
