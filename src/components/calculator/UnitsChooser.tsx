import { For } from "solid-js";
import { Units } from "../../enums/Units";
import IconMeasure from "../icons/IconMeasure";

interface IUnitsChooserProps {
  units: Units;
  onUnitsChange: (unit: Units) => void;
}

export default function UnitsChooser(props: IUnitsChooserProps) {
  const systems = [
    {
      text: "Metric (Kg / cm.)",
      value: Units.metric,
    },
    {
      text: "Imperial (Feet & Inches / Pounds)",
      value: Units.imperial,
    },
  ];

  return (
    <form class="form">
      <label class="form-label" for="unitSystem">
        <IconMeasure /> Units
      </label>
      <select
        class="form-select"
        name="unitSystem"
        id="unitSystem"
        onChange={(e) => {
          props.onUnitsChange((e.target as HTMLInputElement).value as Units);
        }}
      >
        <For each={systems}>
          {({ text, value }) => <option value={value}>{text}</option>}
        </For>
      </select>
    </form>
  );
}
