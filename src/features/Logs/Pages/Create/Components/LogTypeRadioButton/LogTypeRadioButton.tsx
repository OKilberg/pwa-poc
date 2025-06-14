import { LOGTYPE } from "@/shared/queryState/useLogTypes";
import { BriefcaseBusiness, TreePalm } from "lucide-react";
import { ChangeEvent } from "react";

const LogTypeRadioButton = ({
  value,
  checked,
  onChange,
}: {
  value: LOGTYPE;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="label justify-start cursor-pointer gap-3">
      <input
        type="radio"
        name="radio-1"
        value={value}
        className="radio radio-sm md:radio-md"
        checked={checked}
        onChange={onChange}
      />
      <span className="label-text md:text-lg flex">Create {value}</span>
      {value === "log" && <BriefcaseBusiness size={20} />}
      {value === "absence" && <TreePalm size={20} />}
    </label>
  );
};

export default LogTypeRadioButton;
