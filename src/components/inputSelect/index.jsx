import { InputLabel, BoxLayout } from "@/components";
import styles from "./index.module.css";
export default function InputSelect({
  label,
  required,
  options,
  selected,
  onChange,
}) {
  return (
    /**
     * TODO: select 태그에 placeholder 추가
     * option을 따로만들어서 hidden, disabled를 해도 드롭다운에 남아서 좀 더 고민이 필요.
     */

    <BoxLayout>
      <div className={styles.inputSelect}>
        <InputLabel label={label} required={required} />
        <select onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option} selected={selected === option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </BoxLayout>
  );
}
