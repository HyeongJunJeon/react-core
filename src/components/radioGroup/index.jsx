import { Required } from "@/components";

export default function RadioGroup({
  label,
  name,
  options,
  selected,
  onChange,
  required,
}) {
  console.log(options);

  return (
    <div>
      <label>
        {label} {required && <Required />}
      </label>

      <div>
        <input
          type="radio"
          name={name}
          value={options[0]}
          checked={selected === options[0]}
          onChange={(e) => onChange(e.target.value)}
        />
        {options[0]}
      </div>
    </div>
  );
}
