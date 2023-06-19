export function getAmountSpent(items) {
  items.reduce((acc, value) => {
    return acc + parseFloat(value.price);
  }, 0);
}
