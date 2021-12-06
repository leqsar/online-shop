import React from 'react'
import ProductInfoContainer from './ProductInfoContainer.js'
import ProductAmountSettingContainer from './ProductAmountSettingContainer.js'


class BagPage extends React.Component {
  render() {
    const props = this.props;
    const groupOfProducts = this.props.cart.products.map(function (item, index) {
      let attributes;
      return (
        <li key={index} className="bag-page__product-wrapper">
          <ProductInfoContainer
            productInfo={item}
            classPrefix={'bag-page'}
            choosenCurrency={props.choosenCurrency}
          />
          <ProductAmountSettingContainer
            productInfo={item}
            hadleChangeAmountButtonClick={props.hadleChangeAmountButtonClick}
            classPrefix={'bag-page'}
          />
        </li>
      )
    })
    return(
      <div className="bag-page-wrapper">
        <h1>CART</h1>
        <ul>
          {groupOfProducts}
        </ul>
      </div>
    )
  }
}

export default BagPage
