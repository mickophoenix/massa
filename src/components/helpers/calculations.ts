import { processNumber } from "number-helper-functions";

export function calculateBMI(weight: number, height: number): number {
  const bmi = weight / Math.pow(height / 100, 2);

  return processNumber(bmi, 1);
}

function calculateWeightForBMI(height: number, bmi: number): number {
  return bmi * Math.pow(height / 100, 2);
}

export function calculateHealthyWeightRangeForHeight(
  height: number
): [number, number] {
  const normalValues = [18.5, 24.9];

  return normalValues.map((d) =>
    processNumber(calculateWeightForBMI(height, d), 1)
  ) as [number, number];
}

export function kgToPounds(kg: number): number {
  return kg * 2.20462;
}
