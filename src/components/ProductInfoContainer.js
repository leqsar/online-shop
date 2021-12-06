import React from 'react'
import Attributes from './Attributes.js'
import findAppropriateSymbol from '../findAppropriateSymbol.js'

class ProductInfoContainer extends React.Component {
  render() {
    const choosenCurrency = this.props.choosenCurrency;
    const currentCurrency = this.props.productInfo.product.prices.filter(
      price => price.currency===`${choosenCurrency}`
    )[0];
    return (
      <div className={this.props.classPrefix+"__product-info"}>
        <p>{this.props.productInfo.product.brand}</p>
        <span className={this.props.classPrefix+"__product-name"}>{this.props.productInfo.product.name}</span>
        <span>{findAppropriateSymbol(choosenCurrency)}{currentCurrency.amount}</span>
        <Attributes
          choosenProduct={this.props.productInfo.product}
          classPrefix={this.props.classPrefix}
          handleAttributeClick={this.props.handleAttributeClick}
          choosenAttributes={this.props.productInfo.choosenAttributes}
        />
      </div>
    )
  }
}

export default ProductInfoContainer
