import { createEffect, createSignal, on } from "solid-js";
import { ICalculatorProps } from "../../interfaces/ICalculatorProps";
import CalculateButton from "./CalculateButton";
import IconHeight from "../icons/IconHeight";
import IconWeight from "../icons/IconWeight";

function getHeightInCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  const cmConversionFactor = 2.54;

  return totalInches * cmConversionFactor;
}

function getWeightInKg(weightInPounds: number): number {
  const kgConversionFactor = 0.45359237;

  return weightInPounds * kgConversionFactor;
}

export default function CalculatorImperial(props: ICalculatorProps) {
  const [heightFeet, setHeightFeet] = createSignal(5);
  const [heightInches, setHeightInches] = createSignal(10);
  const [weight, setWeight] = createSignal(160);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    props.onCalculate(
      getWeightInKg(weight()),
      getHeightInCm(heightFeet(), heightInches())
    );
  }

  createEffect(
    on([() => heightFeet(), () => heightInches(), () => weight()], () => {
      props.onTouch();
    })
  );

  return (
    <form class="form" onSubmit={handleSubmit}>
      <div class="vstack gap-2">
        <div class="form-group">
          <div class="row">
            <div class="col">
              <label class="form-label" for="heightFeet">
                <IconHeight /> Height
              </label>
            </div>
          </div>
          <div class="row row-cols-2 g-2">
            <div class="col">
              <div class="input-group">
                <input
                  type="text"
                  id="heightFeet"
                  name="heightFeet"
                  class="form-control"
                  value={heightFeet()}
                  onInput={(e) =>
                    setHeightFeet(Number((e.target as HTMLInputElement).value))
                  }
                />
                <span class="input-group-text">Feet</span>
              </div>
            </div>
            <div class="col">
              <div class="input-group">
                <input
                  type="text"
                  id="heightInches"
                  name="heightInches"
                  class="form-control"
                  value={heightInches()}
                  onInput={(e) => {
                    setHeightInches(
                      Number((e.target as HTMLInputElement).value)
                    );
                  }}
                />
                <span class="input-group-text">Inches</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="weight" class="form-label">
            <IconWeight /> Weight
          </label>
          <div class="input-group">
            <input
              type="number"
              id="weight"
              name="weight"
              class="form-control"
              value={weight()}
              onInput={(e) =>
                setWeight(Number((e.target as HTMLInputElement).value))
              }
            />
            <span class="input-group-text">Pounds</span>
          </div>
        </div>
        <div class="form-group">
          <CalculateButton />
        </div>
      </div>
    </form>
  );
}
