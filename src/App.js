import './App.css';
import Header from './components/Header.js'
import CategoryPage from './components/CategoryPage.js'
import ProductPage from './components/ProductPage.js'
import CartOverlay from './components/CartOverlay.js'
import BagPage from './components/BagPage.js'
import CurrencyOverlay from './components/CurrencyOverlay.js'
import {CATEGORYQUERY, PRODUCTQUERY} from './constants.js'
import React from 'react';
import {gql} from "@apollo/client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName:'',
      products: [],
      itemIsClicked: false,
      homePageIconIsClicked: true,
      headerCartIconIsClicked: false,
      choosenProduct: '',
      cart: {
        products: [],
        total: 0,
        amountOfItems: 0
      },
      openBag: false,
      choosenCurrency: 'USD',
      currencyOverlayIsOpen: false,
      styleOfArrow: {}
    }
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.handleHomePageClick = this.handleHomePageClick.bind(this);
    this.handleHeaderCartClick = this.handleHeaderCartClick.bind(this);
    this.hadleChangeAmountButtonClick = this.hadleChangeAmountButtonClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleViewBagButton = this.handleViewBagButton.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleCurrencyChangeClick = this.handleCurrencyChangeClick.bind(this);
  }

  componentDidMount() {
    this.props.client
    .query({
      query: gql`${CATEGORYQUERY}`
    })
    .then((result) => {
      this.setState({
        categoryName: result.data.categories[1].name,
        products: result.data.categories[1].products
      })
    });
  }

  handleProductClick(e) {
    this.props.client
    .query({
      query: gql`
        query {
          product(id: "${e.currentTarget.id}")${PRODUCTQUERY}
        }`
    })
    .then((result) => {
      this.setState({
          choosenProduct: result.data.product,
          itemIsClicked: true,
          homePageIconIsClicked: false
      })
    });
  }

  handleAddToCartClick() {
    let productIsInTheList;
    const products = this.state.cart.products.concat();
    products.forEach((product) => {
      if(product.product.name === this.state.choosenProduct.name) {
        productIsInTheList = true;
        product.amount = product.amount + 1;
      } else {
        productIsInTheList = false;
      }
    })
    if(!productIsInTheList) {
      products.push(
        {
          product: this.state.choosenProduct,
          amount: 1
        }
      )
    }
    this.setState((state) => {
      const newAmountOfItems = state.cart.amountOfItems + 1;
      const newTotal = Math.trunc((state.cart.total + this.state.choosenProduct.prices[0].amount)*100)/100;
      return {
        cart: {
          products: products,
          amountOfItems:  newAmountOfItems,
          total: newTotal
        },
      }
    });
  }

  handleHomePageClick() {
    this.setState({
      homePageIconIsClicked: true,
      itemIsClicked: false,
    });
  }

  handleCurrencyClick() {
    this.setState({
      currencyOverlayIsOpen: !this.state.currencyOverlayIsOpen
    })
  }

  handleCurrencyChangeClick(event){
    this.setState({
      choosenCurrency: `${event.currentTarget.dataset.currency}`
    })
  }

  handleHeaderCartClick(event) {
    this.setState({
      headerCartIconIsClicked: !this.state.headerCartIconIsClicked
    });

  }

  hadleChangeAmountButtonClick(event) {
    let products = this.state.cart.products.concat();
    let productForChange = products.filter(product =>
      product.product.name === event.target.dataset.productName
    );
    const indexOfProductForChange = products.indexOf(productForChange[0]);
    let newTotal, newAmountOfItems;
    if(event.target.textContent === "+") {
      products[indexOfProductForChange].amount++;
      newTotal = Math.trunc((this.state.cart.total + products[indexOfProductForChange].product.prices[0].amount)*100)/100;
      newAmountOfItems = this.state.cart.amountOfItems + 1;
    } else {
      products[indexOfProductForChange].amount--;
      newTotal = Math.trunc((this.state.cart.total - products[indexOfProductForChange].product.prices[0].amount)*100)/100;
      newAmountOfItems = this.state.cart.amountOfItems - 1;
    }
    if(products[indexOfProductForChange].amount === 0) {
      products.splice(indexOfProductForChange, 1)
    }
    this.setState({
      cart: {
        products: products,
        total: newTotal,
        amountOfItems: newAmountOfItems
      }
    })
  }

  handleRandomClick(event){
    this.setState({
      headerCartIconIsClicked: false
    })
  }

  handleViewBagButton(){
    this.setState({
      openBag: true,
      homePageIconIsClicked: false,
      itemIsClicked: false,
      headerCartIconIsClicked: false
    })
  }

  render() {
    let page;
    if(this.state.itemIsClicked){
      page = <ProductPage
                choosenProduct={this.state.choosenProduct}
                handleAddToCartClick={this.handleAddToCartClick}
                choosenCurrency={this.state.choosenCurrency}/>
    } else if(this.state.homePageIconIsClicked){
      page = <CategoryPage
                categoryName={this.state.categoryName}
                products={this.state.products}
                handleProductClick={this.handleProductClick}
                choosenCurrency={this.state.choosenCurrency}/>
    } else if(this.state.openBag) {
      page = <BagPage
                cart={this.state.cart}
                hadleChangeAmountButtonClick={this.hadleChangeAmountButtonClick}
                handleViewBagButton={this.handleViewBagButton}
                choosenCurrency={this.state.choosenCurrency}/>
    }
    return (
      <div className="App">
        <Header
          handleHomePageClick={this.handleHomePageClick}
          handleHeaderCartClick={this.handleHeaderCartClick}
          handleCurrencyClick={this.handleCurrencyClick}
          cart={this.state.cart}
          headerCartIconIsClicked={this.state.headerCartIconIsClicked}
          choosenCurrency={this.state.choosenCurrency}
          styleOfArrow={this.state.currencyOverlayIsOpen ? {transform: 'rotate(180deg)'} : {}} />
        {this.state.headerCartIconIsClicked && (
            <CartOverlay
              cart={this.state.cart}
              hadleChangeAmountButtonClick={this.hadleChangeAmountButtonClick}
              handleViewBagButton={this.handleViewBagButton}
              choosenCurrency={this.state.choosenCurrency}/>
        )}
        {this.state.headerCartIconIsClicked && (
            <div className="opacity-overlay" onClick={this.handleRandomClick}></div>
        )}
        {this.state.currencyOverlayIsOpen && (
            <CurrencyOverlay
              handleCurrencyChangeClick={this.handleCurrencyChangeClick}/>
        )}
        {page}
      </div>
    );
  }
}

export default App;
