import React from 'react';

class ProductPage extends React.Component {
  render () {
    let isSwatch, button;
    const product = this.props.choosenProduct;
    const listOfAttributes = product.attributes.map(function(attribute, index) {
      isSwatch = attribute.type === "swatch" ? true : false;
      const listOfAttributeItems = attribute.items.map(function(item, index) {
        if(isSwatch) {
          return <li key={index} style={{background: `${item.value}`}}></li>
        } else {
          return <li key={index}>{item.value}</li>
        }
      })
      return (
        <React.Fragment key={index}>
          <p className="product-page__attribute-name">{attribute.name}</p>
          <ul className="attribute-items">
            {listOfAttributeItems}
          </ul>
        </React.Fragment>
      )
    })

    const gallery = product.gallery.map((link, index) =>
      <img className="miniature" src={link} alt="" key={index}></img>
    )

    if(product.inStock) {
      button = <button
        className="product-page__add-to-card-button"
        onClick={this.props.handleAddToCartClick}>add to cart</button>
    } else {
      button = <button className="product-page__not-in-stock-button">not in stock</button>
    }

    return (
      <div className="product-page" onClick={this.props.onClick}>
        <div className="product-page__gallery">
          <div className="product-page__miniature-gallery">
            {gallery}
          </div>
          <img className="product-page__main-image" src={product.gallery[0]} alt="product-image"></img>
        </div>
        <div className="product-page__information">
          <h1>{product.brand}</h1>
          <p className="product-page__name">{product.name}</p>
          {listOfAttributes}
          <p className="product-page__price-heading">Price</p>
          <span className="product-page__price">{product.prices[0].currency}{product.prices[0].amount}</span>
          {button}
          <div className="description" dangerouslySetInnerHTML={{__html: product.description}}>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
