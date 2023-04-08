import { whoTable } from "../helpers/who";
import { createAutoResetSignal } from "../../composables/createAutoResetSignal";
import IconSaveHistory from "../icons/IconSaveHistory";

export default function BmiResult(props: {
  bmi: number;
  healthyWeightRange: number[];
  weightUnits: string;
  onSave: (bmi: number) => void;
}) {
  const assessment = () => whoTable.find((d) => d.checker(props.bmi));

  const healthyWeightRangeText = () =>
    `${props.healthyWeightRange.join(" - ")} ${props.weightUnits}`;

  const [saved, setSaved] = createAutoResetSignal(false);

  const historyText = () => (saved() ? "Saved" : "Save to history");

  return (
    <>
      <div class="card shadow-sm">
        <div class="card-body">
          <table class="table table-borderless table-sm mb-1">
            <tbody>
              <tr>
                <td>Your BMI</td>
                <td class="fw-bold">
                  {props.bmi} kg/m<sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Nutritional Status</td>
                <td class="fw-bold">{assessment()?.label ?? ""}</td>
              </tr>
              <tr>
                <td>Healthy weight for the height:</td>
                <td class="fw-bold">{healthyWeightRangeText()}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-link p-0"
            onClick={() => {
              props.onSave(props.bmi);
              setSaved(true);
            }}
          >
            <IconSaveHistory /> {historyText()}
          </button>
        </div>
      </div>
    </>
  );
}
