import { BoxLayout } from "@/components";
import styles from "./index.module.css";

export default function ResultSection({ onClick }) {
  return (
    <BoxLayout>
      <header className={styles.surveyResult}>
        <h1>Survey</h1>
        <h3>설문이 성공적으로 저장되었습니다.</h3>
        <button className={styles.button} onClick={onClick}>
          처음으로
        </button>
      </header>
    </BoxLayout>
  );
}
