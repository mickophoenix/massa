export const whoTable = [
  {
    label: "Underweight",
    key: "< 18.5",
    checker: (val: number): boolean => {
      return val < 18.5;
    },
  },
  {
    label: "Normal weight",
    key: "18.5–24.9",
    checker: (val: number): boolean => {
      return val >= 18.5 && val < 24.9;
    },
  },
  {
    label: "Pre-obesity",
    key: "25.0 – 29.9",
    checker: (val: number): boolean => {
      return val >= 25.0 && val <= 29.9;
    },
  },
  {
    label: "Obesity class I",
    key: "30.0 – 34.9",
    checker: (val: number): boolean => {
      return val >= 30.0 && val <= 34.9;
    },
  },
  {
    label: "Obesity class II",
    key: "35.0 – 39.9",
    checker: (val: number): boolean => {
      return val >= 35.0 && val <= 39.9;
    },
  },
  {
    label: "Obesity class III",
    key: "> 40",
    checker: (val: number): boolean => {
      return val >= 40;
    },
  },
];
