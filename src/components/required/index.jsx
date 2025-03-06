import styles from "./index.module.css";

export default function Required({ text }) {
  return <span className={styles.required}>* {text && text}</span>;
}
