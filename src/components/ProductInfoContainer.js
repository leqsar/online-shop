import React from 'react'
import Attributes from './Attributes.js'

class ProductInfoContainer extends React.Component {
  render() {
    return (
      <div className={this.props.classPrefix+"__product-info"}>
        <p>{this.props.productInfo.product.brand}</p>
        <span className={this.props.classPrefix+"__product-name"}>{this.props.productInfo.product.name}</span>
        <span>{this.props.productInfo.product.prices[0].currency}{this.props.productInfo.product.prices[0].amount}</span>
        <Attributes
          choosenProduct={this.props.productInfo.product}
          classPrefix={this.props.classPrefix}/>
      </div>
    )
  }
}

export default ProductInfoContainer
