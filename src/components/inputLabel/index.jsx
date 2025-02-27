import { Required } from "@/components";

export default function InputLabel({ label, required = false }) {
  return (
    <label>
      {label} {required && <Required />}
    </label>
  );
}
