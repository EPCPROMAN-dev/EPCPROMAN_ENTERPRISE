
import { TimePicker } from "@progress/kendo-react-dateinputs";
import "./KendoElements.css";

interface AppTimePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  required?: boolean;
  format?: string;
}

export default function AppTimePicker({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  format = "hh:mm a",
}: AppTimePickerProps) {
  return (
    <div className="app-time-picker">
      <label className="app-time-picker-label">
        {label}
        {required && <span className="app-time-picker-required">*</span>}
      </label>

      <TimePicker
        value={value}
        onChange={(event) => onChange(event.value)}
        disabled={disabled}
        format={format}
        width="100%"
      />
    </div>
  );
}
