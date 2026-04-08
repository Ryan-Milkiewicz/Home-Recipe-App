export function decimalToFraction(decimal: number): string {
  const fractions: Record<number, string> = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4",
    0.333: "1/3",
    0.667: "2/3",
    0.125: "1/8",
    0.375: "3/8",
    0.625: "5/8",
    0.875: "7/8",
  };

  const whole = Math.floor(decimal);
  const remainder = Math.round((decimal - whole) * 1000) / 1000;

  const fraction = fractions[remainder];

  if (whole && fraction) return `${whole} ${fraction}`; // "1 3/4"
  if (fraction) return fraction; // "3/4"
  if (whole) return whole.toString(); // "2"
  return decimal.toString(); // fallback
}
