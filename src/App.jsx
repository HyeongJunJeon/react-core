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
