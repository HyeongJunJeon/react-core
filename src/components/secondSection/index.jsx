import { InputField, InputSelect } from "@/components";

export default function SecondSection({ form, onChange }) {
  return (
    <section>
      <InputSelect
        label="다음으로 공부하고 싶은 프레임워크는 무엇인가요?"
        required
        options={["React", "Vue", "Angular", "Next", "jQuery"]}
        selected={form.selectOption || "React"}
        onChange={(newValue) => {
          onChange("selectOption", newValue);
        }}
      />
      <InputField
        label="성함을 입력해주세요."
        required
        value={form.name || ""}
        placeholder="김OO"
        onChange={(newValue) => {
          onChange("name", newValue);
        }}
      />
    </section>
  );
}
