import Select from "react-select";

function MultiSelect({ selectedOptions = [], onChange, options = [] }) {
  // Add null check and default to empty array if undefined
  const selectedValues = Array.isArray(selectedOptions)
    ? options.filter((option) => selectedOptions.includes(option.value))
    : [];

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
