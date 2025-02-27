import styles from "./index.module.css";

export default function Button({
  onClick,
  label,
  type = "primary",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[type]}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
