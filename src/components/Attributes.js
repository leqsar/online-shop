import React from 'react'

class Attributes extends React.Component {
  constructor(props) {
    super(props);
    this.styleOfClickedAttribute = {
      background: '#000000',
      color: '#FFFFFF'
    }
  }

  render() {
    let isSwatch, button;
    const styleOfClickedAttribute = this.styleOfClickedAttribute;
    const props = this.props;
    const product = props.choosenProduct;
    const listOfAttributes = product.attributes.map(function(attribute, index) {
      isSwatch = attribute.type === "swatch" ? true : false;
      const listOfAttributeItems = attribute.items.map(function(item, index) {
        const indexOfAttribute = props.choosenAttributes.findIndex(choosenAttribute =>
          choosenAttribute.name === attribute.name && choosenAttribute.value === item.value
        );
        if(isSwatch) {
          return <li
                    key={index}
                    style={{background: `${item.value}`}}
                    onClick={props.handleAttributeClick}
                    data-attribute={attribute.name}
                  ></li>
        } else {
          return <li
                    key={index}
                    onClick={props.handleAttributeClick}
                    data-attribute={attribute.name}
                    style={indexOfAttribute !== -1 ? styleOfClickedAttribute : {}}
                  >{item.value}</li>
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
