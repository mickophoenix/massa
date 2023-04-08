import {
  batch,
  createEffect,
  createSignal,
  Match,
  on,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { Units } from "../enums/Units";
import CalculatorMetric from "./calculator/CalculatorMetric";
import CalculatorImperial from "./calculator/CalculatorImperial";
import BmiResult from "./calculator/BmiResult";
import {
  calculateBMI,
  calculateHealthyWeightRangeForHeight,
  kgToPounds,
} from "./helpers/calculations";
import { processNumber } from "number-helper-functions";
import { IHistory } from "../interfaces/IHistory";
import BmiHistory from "./calculator/BmiHistory";
import { randomUUID } from "uncrypto";
import produce from "immer";
import { remove } from "lodash-es";

export default function Calculator(props: { units: Units }) {
  const [bmi, setBmi] = createSignal<null | number>(null);
  const [healthyWeightRange, setHealthyWeightRange] = createSignal<
    [number, number]
  >([0, 0]);

  const weightUnit = () => (props.units === Units.metric ? "kg." : "pounds");
  const localizedHealthyWeightRange = () => {
    if (props.units === Units.metric) {
      return healthyWeightRange().map((d) => processNumber(d, 1));
    } else {
      return healthyWeightRange().map((d) => processNumber(kgToPounds(d), 1));
    }
  };

  createEffect(
    on(
      () => props.units,
      () => {
        batch(() => {
          setBmi(null);
          setHealthyWeightRange([0, 0]);
        });
      }
    )
  );

  function onCalculate(weight: number, height: number): void {
    batch(() => {
      setBmi(calculateBMI(weight, height));
      setHealthyWeightRange(calculateHealthyWeightRangeForHeight(height));
    });
  }

  function onTouch() {
    batch(() => {
      setBmi(null);
      setHealthyWeightRange([0, 0]);
    });
  }

  const [history, setHistory] = createSignal<IHistory[]>([]);

  function onSave(bmi: number): void {
    setHistory(
      produce(history(), (draft) => {
        draft.push({
          id: randomUUID(),
          date: new Date(),
          bmi,
        });
      })
    );
  }

  onMount(() => {
    const saved = localStorage.getItem("bmi-history");

    if (saved) {
      setHistory(JSON.parse(saved) as IHistory[]);
    }
  });

  createEffect(() => {
    localStorage.setItem("bmi-history", JSON.stringify(history()));
  });

  function handleHistoryDelete(id?: string): void {
    if (id) {
      setHistory(
        produce(history(), (draft) => {
          remove(draft, (d) => d.id === id);
        })
      );
    } else {
      setHistory([]);
    }
  }

  return (
    <>
      <div class="vstack gap-3">
        <Switch>
          <Match when={props.units == Units.metric}>
            <CalculatorMetric onCalculate={onCalculate} onTouch={onTouch} />
          </Match>
          <Match when={props.units == Units.imperial}>
            <CalculatorImperial onCalculate={onCalculate} onTouch={onTouch} />
          </Match>
        </Switch>
        <Show when={bmi() !== null}>
          <BmiResult
            bmi={bmi() as number}
            healthyWeightRange={localizedHealthyWeightRange()}
            weightUnits={weightUnit()}
            onSave={onSave}
          />
        </Show>
        <BmiHistory history={history()} onDelete={handleHistoryDelete} />
      </div>
    </>
  );
}
