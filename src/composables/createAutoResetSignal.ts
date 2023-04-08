import { Accessor, createEffect, createSignal, Setter } from "solid-js";

export const createAutoResetSignal = (
  initialValue: boolean
): [Accessor<boolean>, Setter<boolean>] => {
  const [value, setValue] = createSignal(initialValue);

  createEffect(() => {
    if (value()) {
      setTimeout(() => {
        setValue(false);
      }, 1500);
    }
  });

  return [value, setValue];
};
