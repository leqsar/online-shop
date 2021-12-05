import React from 'react';
import ProductInfoContainer from "./ProductInfoContainer.js"
import ProductAmountSettingContainer from "./ProductAmountSettingContainer.js"
import findAppropriateSymbol from '../findAppropriateSymbol.js'

class CartOverlay extends React.Component {
  render() {
    const props = this.props;
    const productsList = this.props.cart.products.map(function (item, index) {
      let attributes;
      return (
        <li key={index} className="cart-overlay__product-wrapper">
          <ProductInfoContainer
            productInfo={item}
            classPrefix={'cart-overlay'}
            choosenCurrency={props.choosenCurrency}
            handleAttributeClick={props.handleAttributeClick}
            choosenAttributes={props.choosenAttributes}/>
          <ProductAmountSettingContainer
            productInfo={item}
            hadleChangeAmountButtonClick={props.hadleChangeAmountButtonClick}
            classPrefix={'cart-overlay'}/>
        </li>
      )
    })

    return (
      <div className="cart-ovarlay">
        <div className="cart-overlay-information">
          <p>My Bag, {this.props.cart.amountOfItems} items</p>
          <ul className="cart-overlay__products-wrapper">
            {productsList}
          </ul>
          <p className="total-wrapper">
            <span>Total</span>
            <span>{this.props.cart.total}</span>
          </p>
        </div>
        <div className="cart-overlay__buttons-wrapper">
          <button
            className="cart-overlay__viewBag-button"
            onClick={this.props.handleViewBagButton}>view bag</button>
          <button className="cart-overlay__checkOut-button">check out</button>
        </div>
      </div>
    )
  }
}

export default CartOverlay
