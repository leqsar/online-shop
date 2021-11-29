import React from 'react';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardHovered : false
    }
    this.createCardElement = this.createCardElement.bind(this);
    //this.handleMouseEnter = this.handleMouseEnter.bind(this);
    //this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /*handleMouseEnter(e) {
    this.setState({
      isCardHovered: true
    });
    console.log(e.currentTarget);
  }

  handleMouseLeave(e) {
    this.setState({
      isCardHovered: false
    });
    console.log(e.currentTarget);
  }*/

  createCardElement(product) {
    let warningAboutUnstockedItem, unstokedItemStyle;
    if (!product.inStock) {
      warningAboutUnstockedItem = <span className="unstoked-warning">out of stock</span>;
      unstokedItemStyle = {opacity: "0.5"};
    }
    return (
      <div
        key={product.id}
        id={product.id}
        className="product-card"
        //onMouseEnter={this.handleMouseEnter}
        //onMouseLeave={this.handleMouseLeave}
        onClick={this.props.handleProductClick}
      >
        {warningAboutUnstockedItem}
        <img className="product-image" src={product.gallery[0]} style={unstokedItemStyle} alt=""></img>
        <span className="product-name" style={unstokedItemStyle}>{product.name}</span>
        <span className="product-price" style={unstokedItemStyle}>{product.prices[0].amount}{product.prices[0].currency}</span>
        {this.state.isCardHovered && (
          <div className="category-page__add-to-card-button">
            <img src="/images/white-cart.svg" alt="cart-icon"></img>
          </div>
        )}
      </div>
    )
  }

  render() {
    const productsArray = this.props.products;
    const listProducts = productsArray.map((product) => this.createCardElement(product));
    return (
      <div className="category-page">
        <h1>{this.props.categoryName}</h1>
        <div className="products-wrapper">
          {listProducts}
        </div>
      </div>
    )
  }
}

export default CategoryPage
