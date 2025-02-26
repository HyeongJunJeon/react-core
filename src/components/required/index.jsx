import styles from "./index.module.css";

export default function Required({ text }) {
  return <p className={styles.required}>* {text && text}</p>;
}
