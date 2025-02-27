import {
  CheckboxGroup,
  InputField,
  RadioGroup,
  InputSelect,
  SurveyResult,
} from "@/components";

export default function FirstSection() {
  return (
    <div>
      <RadioGroup
        label="radio input"
        required
        name="radioOption"
        options={["option1", "option2", "option3"]}
        checked={"option1"}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <CheckboxGroup
        label="checkbox input"
        required
        options={["option1", "option2", "option3"]}
        checked={["option1"]}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <InputField
        label="text input"
        required
        value=""
        placeholder="내답변"
        onChange={(e) => {
          console.log(e);
        }}
      />
      <InputSelect
        label="select input"
        required
        options={["option1", "option2", "option3"]}
        selected={"option2"}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <SurveyResult />
    </div>
  );
}
