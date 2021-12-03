import React from 'react';
import findAppropriateSymbol from '../findAppropriateSymbol.js'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardHovered : false,
      hoveredItemId: ''
    }
    this.createCardElement = this.createCardElement.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    this.setState({
      isCardHovered: true,
      hoveredItemId: e.currentTarget.id
    });
  }

  handleMouseLeave(e) {
    this.setState({
      isCardHovered: false,
      hoveredItemId: ''
    });
  }

  createCardElement(product, hoveredItemId) {
    let warningAboutUnstockedItem, unstokedItemStyle;
    const choosenCurrency = this.props.choosenCurrency;
    if (!product.inStock) {
      warningAboutUnstockedItem = <span className="unstoked-warning">out of stock</span>;
      unstokedItemStyle = {opacity: "0.5"};
    }
    const currentCurrency = product.prices.filter(price =>
      price.currency===`${choosenCurrency}`
    )[0];
    const hovered = product.id === hoveredItemId ? true : false;
    return (
      <div
        key={product.id}
        id={product.id}
        className="product-card"
        onClick={this.props.handleProductClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-hover={hovered}
      >
        {warningAboutUnstockedItem}
        <img
          className="product-image"
          src={product.gallery[0]}
          style={unstokedItemStyle}
          alt=""></img>
        <span className="product-name" style={unstokedItemStyle}>{product.name}</span>
        <span className="product-price" style={unstokedItemStyle}>{currentCurrency.amount}{findAppropriateSymbol(choosenCurrency)}</span>
        {hovered && (
          <div className="category-page__add-to-card-button">
            <img src="/images/white-cart.svg" alt="cart-icon" className="category-page__add-to-card-icon"></img>
          </div>
        )}
      </div>
    )
  }

  render() {
    const productsArray = this.props.products;
    const listProducts = productsArray.map((product) => this.createCardElement(product, this.state.hoveredItemId));
    return (
      <div className="category-page" onClick={this.props.onClick}>
        <h1>{this.props.categoryName}</h1>
        <div className="products-wrapper">
          {listProducts}
        </div>
      </div>
    )
  }
}

export default CategoryPage
