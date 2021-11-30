import React from 'react'

class CartOverlay extends React.Component {
  render() {
    const productsList = this.props.cart.products.map(function (product, index) {
      let attributes;
      return (
        <li key={index} className="cart-overlay__product-wrapper">
          <div className="cart-overlay__product-info">
            <p>{product.brand}</p>
            <span className="cart-overlay__product-name">{product.name}</span>
            <span>{product.prices[0].currency}{product.prices[0].amount}</span>
            <ul>
              /*{attributes}*/
            </ul>
          </div>
          <div className="cart-overlay__product-amount-info">
            <button>+</button>
            <span>X</span>
            <button>-</button>
          </div>
          <img className="cart-overlay__product-image" src={product.gallery[0]} alt="product-image"></img>
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
          <button className="cart-overlay__viewBag-button">view bag</button>
          <button className="cart-overlay__checkOut-button">check out</button>
        </div>
      </div>
    )
  }
}

export default CartOverlay