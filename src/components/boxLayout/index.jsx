import styles from "./index.module.css";

export default function BoxLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
