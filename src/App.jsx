import {
  Button,
  FirstSection,
  Header,
  ResultSection,
  SecondSection,
} from "@/components";
import { useEffect } from "@/hooks/useEffect";
import { useState } from "@/hooks/useState";
import { setItem, getItem, removeItem } from "@/util/storage";
import styles from "./App.module.css";
import { FORM } from "@/util/const";

function App() {
  const [step, setStep] = useState(1);
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);
  const [form, setForm] = useState(getItem(FORM) || {});

  const handleNext = () => {
    const isSubmit = step === 2;

    if (isSubmit) {
      handleSubmit();
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleFormChange = (key, value, isMultiple = false) => {
    setForm((prev) => ({
      ...prev,
      [key]: isMultiple ? [...(prev[key] || []), value] : value,
    }));
  };

  const handleClearForm = () => {
    removeItem(FORM);
    setForm({});
  };

  const handleResetStep = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    //TODO: fetch 구현
    handleClearForm();
  };

  const renderSectionByStep = (step) => {
    switch (step) {
      case 1:
        return <FirstSection form={form} onChange={handleFormChange} />;
      case 2:
        return <SecondSection form={form} onChange={handleFormChange} />;
      case 3:
        return <ResultSection onClick={handleResetStep} />;
      default:
        return <FirstSection form={form} onChange={handleFormChange} />;
    }
  };
  useEffect(() => {
    setItem(FORM, form);
  }, [form]);

  useEffect(() => {
    setIsSurveyFinished(step === 3);
  }, [step]);

  return (
    /**
     * TODO: isSurveyFinished일 때 &&로 제어가 안되고 삼항연산자로 <div></div>를 명시해줘야 하는 문제
     * TODO: button도 마찬가지로 null을 명시해줘야 하는문제
     * TODO: button의 개별적인 렌더링도 조건식으로 처리해야하는데 step이 바뀌어도 ui가 안바뀌는 문제가 있어 우선 disabled처리
     * TODO: 양식 지우기 버튼도 step이 1일 때 클릭 시 ui가 초기화가 안되는 문제가 있어 우선 disabled처리
     * diff에서 비교하면서 dom을 정상적으로 삭제해야하는데 디버깅 필요
     */
    <main className={styles.mainContainer}>
      {!isSurveyFinished ? <Header /> : <div></div>}
      {renderSectionByStep(step)}

      {!isSurveyFinished ? (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonGroup}>
            <Button
              label="이전"
              onClick={handlePrev}
              type="secondary"
              disabled={step === 1}
            />
            <Button label="다음" onClick={handleNext} />
          </div>
          <Button
            label="양식 지우기"
            onClick={() => {
              handleClearForm();
              handleResetStep();
            }}
            type="tertiary"
            disabled={step === 1}
          />
        </div>
      ) : null}
    </main>
  );
}

export default App;
