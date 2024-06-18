export const formatToDollar = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
