export const formatPrice = (price: number, currency: string) => {
  const formattedNumber = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedNumber} ${currency}`;
};
