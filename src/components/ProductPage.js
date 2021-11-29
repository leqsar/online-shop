import React from 'react';

class ProductPage extends React.Component {
  render () {
    let isSwatch;
    const listOfAttributes = this.props.product.attributes.map(function(attribute, index) {
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

    const gallery = this.props.product.gallery.map((link, index) =>
      <img className="miniature" src={link} alt="" key={index}></img>
    )

    return (
      <div className="product-page">
        <div className="product-page__gallery">
          <div className="product-page__miniature-gallery">
            {gallery}
          </div>
          <img className="product-page__main-image" src={this.props.product.gallery[0]} alt="product-image"></img>
        </div>
        <div className="product-page__information">
          <h1>{this.props.product.brand}</h1>
          <p className="product-page__name">{this.props.product.name}</p>
          {listOfAttributes}
          <p className="product-page__price-heading">Price</p>
          <span className="product-page__price">{this.props.product.prices[0].currency}{this.props.product.prices[0].amount}</span>
          <button
            className="product-page__add-to-card-button"
            >add to cart</button>
          <div className="description" dangerouslySetInnerHTML={{__html: this.props.product.description}}>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
