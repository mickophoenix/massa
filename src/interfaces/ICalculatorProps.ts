export interface ICalculatorProps {
  onCalculate: (weightInKgs: number, heightInCm: number) => void;
  onTouch: () => void;
}
