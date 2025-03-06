import { InputLabel, BoxLayout } from "@/components";
import styles from "./index.module.css";
export default function CheckboxGroup({
  label,
  options,
  checked,
  onChange,
  required = false,
}) {
  return (
    <BoxLayout>
      <div>
        <InputLabel label={label} required={required} />
        <div className={styles.checkboxGroup}>
          {options.map((option) => (
            <label key={option} className={styles.checkbox}>
              <input
                type="checkbox"
                value={option}
                checked={checked.includes(option)}
                onChange={(e) => onChange(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </BoxLayout>
  );
}
