import React from 'react'
import {CORRESPONDINGCURRENCYSYMBOLS} from '../constants.js'

class CurrencyOverlay extends React.Component {
  render() {
    const listOfCurrencies = CORRESPONDINGCURRENCYSYMBOLS.map((item) =>
      <li
        className="currency-overlay__currency-container"
        onClick={this.props.handleCurrencyChangeClick}
        data-currency={item.name}>
        <span>{item.symbol}</span><span>{item.name}</span></li>
    );
    return (
      <ul className="currency-overlay">
        {listOfCurrencies}
      </ul>
    )
  }
}

export default CurrencyOverlay
