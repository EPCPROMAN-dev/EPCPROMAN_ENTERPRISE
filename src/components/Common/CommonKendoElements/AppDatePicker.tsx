
import { DatePicker } from "@progress/kendo-react-dateinputs";
import "./KendoElements.css";

interface AppDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  required?: boolean;
  format?: string;
}

export default function AppDatePicker({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  format = "dd-MM-yyyy",
}: AppDatePickerProps) {
  return (
    <div className="w-full app-date-picker">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <DatePicker
        value={value}
        onChange={(event) => onChange(event.value)}
        disabled={disabled}
        format={format}
        width="100%"
        popupSettings={{
            popupClass: "app-date-picker-popup",
        }}
      />
    </div>
  );
}
