import { createEffect, createSignal, on } from "solid-js";
import { ICalculatorProps } from "../../interfaces/ICalculatorProps";
import CalculateButton from "./CalculateButton";
import IconWeight from "../icons/IconWeight";
import IconHeight from "../icons/IconHeight";

export default function CalculatorMetric(props: ICalculatorProps) {
  const [height, setHeight] = createSignal(180);
  const [weight, setWeight] = createSignal(65);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    props.onCalculate(weight(), height());
  }

  createEffect(
    on([() => height(), () => weight()], () => {
      props.onTouch();
    })
  );

  return (
    <form onSubmit={handleSubmit}>
      <div class="vstack gap-2">
        <div class="form-group">
          <label for="height" class="form-label">
            <IconHeight /> Height
          </label>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="height"
              value={height()}
              onInput={(e) => {
                setHeight(Number((e.target as HTMLInputElement).value));
              }}
              required
            />
            <span class="input-group-text">cm.</span>
          </div>
        </div>
        <div class="form-group">
          <label for="weight" class="form-label">
            <IconWeight /> Weight
          </label>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="weight"
              value={weight()}
              onInput={(e) => {
                setWeight(Number((e.target as HTMLInputElement).value));
              }}
              required
            />
            <span class="input-group-text">Kg.</span>
          </div>
        </div>
        <div class="form-group">
          <CalculateButton />
        </div>
      </div>
    </form>
  );
}
