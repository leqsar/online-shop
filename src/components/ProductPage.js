import React from 'react';
import Attributes from './Attributes.js'
import findAppropriateSymbol from '../findAppropriateSymbol.js'
const HtmlToReactParser = require('html-to-react').Parser;
const ReactDOMServer = require('react-dom/server');


class ProductPage extends React.Component {
  render () {
    let button;
    const choosenCurrency = this.props.choosenCurrency;
    const product = this.props.choosenProduct;
    const htmlToReactParser = new HtmlToReactParser();
    const descriptionElement = htmlToReactParser.parse(product.description);
    const gallery = product.gallery.map((link, index) =>
      <img className="miniature" src={link} alt="" key={index}></img>
    )
    const currentCurrency = product.prices.filter(price =>
      price.currency===`${choosenCurrency}`
    )[0];
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
          <img
            className="product-page__main-image"
            src={product.gallery[0]}
            alt="product-image"></img>
        </div>
        <div className="product-page__information">
          <h1>{product.brand}</h1>
          <p className="product-page__name">{product.name}</p>
          <Attributes
            choosenProduct={product}
            classPrefix="product-page"
            handleAttributeClick={this.props.handleAttributeClick}
            choosenAttributes={this.props.choosenAttributes}/>
          <p className="product-page__price-heading">Price</p>
          <span className="product-page__price">{findAppropriateSymbol(choosenCurrency)}{currentCurrency.amount}</span>
          {button}
          <div className="description">
            {descriptionElement}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
