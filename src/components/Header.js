import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <React.Fragment>
        <header>
          <nav className="menu">
            <ul>
              <li>Women</li>
              <li>Men</li>
              <li>Kids</li>
            </ul>
          </nav>
          <img
            className="store-icon"
            src="/images/store-icon.svg"
            onClick={this.props.handleHomePageClick}
            alt=""></img>
          <div className="currency-container">
            <span>$</span>
            <img src="/images/arrow.svg" alt="currency-icon"></img>
          </div>
          <img
            className="cart-icon"
            src="/images/cart.svg"
            onClick={this.props.handleHeaderCartClick}
            alt="cart-icon"></img>
        </header>
      </React.Fragment>
    )
  }
}

export default Header;
