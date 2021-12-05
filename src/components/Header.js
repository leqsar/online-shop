import React from 'react';
import findAppropriateSymbol from '../findAppropriateSymbol.js'

class Header extends React.Component {
  render() {
    const currency = findAppropriateSymbol(this.props.choosenCurrency);
    const props = this.props;
    const categoriesMenu = this.props.categoriesNames.map(function(categoryName){
      let chosenClassName;
      if(categoryName === props.categoryName) {
        chosenClassName = 'chosen';
      } else {
        chosenClassName = '';
      }
      return (<li
                className={chosenClassName}
                onClick={props.handleCategoryClick}>{categoryName}</li>)
    })
    return(
      <React.Fragment>
        <header>
          <nav className="menu">
            <ul>
              {categoriesMenu}
            </ul>
          </nav>
          <img
            className="store-icon"
            src="/images/store-icon.svg"
            onClick={this.props.handleHomePageClick}
            alt=""></img>
          <div className="currency-container" onClick={this.props.handleCurrencyClick}>
            <span>{currency}</span>
            <img src="/images/arrow.svg" alt="currency-icon" style={this.props.styleOfArrow}></img>
          </div>
          <img
            className="cart-icon"
            src="/images/cart.svg"
            onClick={this.props.handleHeaderCartClick}
            alt="cart-icon"></img>
          {this.props.headerCartIconIsClicked && (
            <p className="header__totalOfItemsIcon">{this.props.cart.amountOfItems}</p>)
          }
        </header>
      </React.Fragment>
    )
  }
}
export default Header;
