export const formatCurrency = (amount: string | number) => {
  if (!amount) return "₹0";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
};

export const truncateText = (text: string, length = 50) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};