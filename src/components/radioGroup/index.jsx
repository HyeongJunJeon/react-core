import { InputLabel, BoxLayout } from "@/components";
import styles from "./index.module.css";

export default function RadioGroup({
  label,
  name,
  options,
  checked,
  onChange,
  required = false,
}) {
  return (
    <BoxLayout>
      <div>
        <InputLabel label={label} required={required} />
        <div className={styles.radioGroup}>
          {options.map((option) => (
            <div key={option} className={styles.radio}>
              <input
                className={styles.input}
                type="radio"
                name={name}
                value={option}
                checked={checked === option}
                onChange={(e) => onChange(e.target.value)}
              />
              {option}
            </div>
          ))}
        </div>
      </div>
    </BoxLayout>
  );
}
