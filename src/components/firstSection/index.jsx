import { CheckboxGroup, RadioGroup } from "@/components";

export default function FirstSection({ form, onChange }) {
  return (
    <section>
      <RadioGroup
        label="몇년차 프론트 개발자 이신가요?"
        required
        name="radioOption"
        options={["1년미만", "1~3년", "3~5년", "5~10년", "10년이상"]}
        checked={form.radioOption || "1년미만"}
        onChange={(newValue) => {
          onChange("radioOption", newValue);
        }}
      />
      <CheckboxGroup
        label="다음 중 가능한 프레임워크는 무엇인가요? (여러개 선택 가능)"
        required
        options={["React", "Vue", "Angular", "Next", "jQuery"]}
        checked={form.checkboxOption || []}
        onChange={(newValue) => {
          onChange("checkboxOption", newValue, true);
        }}
      />
    </section>
  );
}
