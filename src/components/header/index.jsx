import styles from "./index.module.css";
import { BoxLayout, Required } from "@/components";

export default function Header() {
  return (
    <BoxLayout>
      <header className={styles.titleContent}>
        <h1>Survey</h1>
        <Required text="표시는 필수 질문임" />
      </header>
    </BoxLayout>
  );
}
