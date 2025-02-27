import { InputLabel, BoxLayout } from "@/components";
import styles from "./index.module.css";
export default function InputField({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}) {
  return (
    <BoxLayout>
      <div className={styles.inputField}>
        <InputLabel label={label} required={required} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </BoxLayout>
  );
}
