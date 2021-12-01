import React from 'react'

class Attributes extends React.Component {
  render() {
    let isSwatch, button;
    const props = this.props;
    const product = props.choosenProduct;
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
          {props.classPrefix === 'product-page' && (
            <p className={props.classPrefix+"__attribute-name"}>{attribute.name}</p>
          )}  
          <ul className={props.classPrefix+"__attribute-items"}>
            {listOfAttributeItems}
          </ul>
        </React.Fragment>
      )
    })
    return(
      <React.Fragment>
        {listOfAttributes}
      </React.Fragment>
    )
  }
}

export default Attributes
