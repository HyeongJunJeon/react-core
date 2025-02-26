import { useState } from "../../hooks/useState";
import styles from "./index.module.css";
import { BoxLayout, RadioGroup } from "@/components";
export default function FirstSection() {
  return (
    <BoxLayout>
      <RadioGroup
        label="radio input"
        required={true}
        name="radioOption"
        options={["option1", "option2", "option3"]}
        selected={"option1"}
        onChange={(e) => {
          console.log(e);
        }}
      />
    </BoxLayout>
  );
}
