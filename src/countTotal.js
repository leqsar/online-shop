export default function countTotal(products, choosenCurrency) {
  const arrayWithPrices = [];
  products.forEach((product) => {
    const currentCurrency = product.product.prices.filter(price =>
      price.currency===`${choosenCurrency}`
    )[0];
    arrayWithPrices.push(currentCurrency.amount*product.amount)
  });
  const newtotal = arrayWithPrices.reduce((previousValue, currentValue) =>
    previousValue + currentValue
  ,0);
  return Math.trunc(newtotal*100)/100;
}
