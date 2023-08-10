const FilterButton = ({ options, defaultValue, value, onChange }) => {
  return (
    <div className="order">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="select"
      >
        <option disabled value="" className="select__item">
          {defaultValue}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="select__item"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FilterButton;
