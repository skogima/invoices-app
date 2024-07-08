export const formatToUSD = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
