import React from 'react'

class ProductAmountSettingContainer extends React.Component {
  render(){
    return(
      <React.Fragment>
        <div className={this.props.classPrefix+"__product-amount-info"}>
          <button
            onClick={this.props.hadleChangeAmountButtonClick}
            data-product-name={this.props.productInfo.product.name}>
          +</button>
          <span>{this.props.productInfo.amount}</span>
          <button
            onClick={this.props.hadleChangeAmountButtonClick}
            data-product-name={this.props.productInfo.product.name}>
          -</button>
        </div>
        <img className={this.props.classPrefix+"__product-image"} src={this.props.productInfo.product.gallery[0]} alt="product-image"></img>
      </React.Fragment>
    )
  }
}

export default ProductAmountSettingContainer;
