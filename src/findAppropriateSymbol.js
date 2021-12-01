import {CORRESPONDINGCURRENCYSYMBOLS} from './constants.js'

export default function findAppropriateSymbol(name) {
  let currencySymbol;
  CORRESPONDINGCURRENCYSYMBOLS.forEach((item) => {
    if(item.name === name) {
      currencySymbol = item.symbol;
    }
  })
  return currencySymbol;
}
