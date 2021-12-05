import './App.css';
import Header from './components/Header.js'
import CategoryPage from './components/CategoryPage.js'
import ProductPage from './components/ProductPage.js'
import CartOverlay from './components/CartOverlay.js'
import BagPage from './components/BagPage.js'
import CurrencyOverlay from './components/CurrencyOverlay.js'
import {CATEGORYQUERY, PRODUCTQUERY} from './constants.js'
import countTotal from './countTotal.js'
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
      styleOfArrow: {},
      choosenAttributes: []
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
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
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
    const isCartIconWasClicked = e.target.classList.contains('category-page__add-to-card-icon');
    const isCartButtonWasClicked = e.target.classList.contains('category-page__add-to-card-button');
    this.props.client
    .query({
      query: gql`
        query {
          product(id: "${e.currentTarget.id}")${PRODUCTQUERY}
        }`
    })
    .then((result) => {
      if(!(isCartIconWasClicked || isCartButtonWasClicked)) {
        this.setState({
            choosenProduct: result.data.product,
            itemIsClicked: true,
            homePageIconIsClicked: false,
            choosenAttributes: []
        })
      } else {
        this.setState({
            choosenProduct: result.data.product,
            choosenAttributes: []/*?*/
        });
        this.handleAddToCartClick()
      }
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
    console.log(this.state.choosenAttributes);
    if(this.state.choosenAttributes.length === this.state.choosenProduct.attributes.length) {
      if(!productIsInTheList) {
        products.push(
          {
            product: this.state.choosenProduct,
            amount: 1,
            choosenAttributes: this.state.choosenAttributes
          }
        )
      }
      this.setState((state) => {
        const newAmountOfItems = state.cart.amountOfItems + 1;
        const newtotal = countTotal(products, state.choosenCurrency)
        return {
          cart: {
            products: products,
            amountOfItems:  newAmountOfItems,
            total: newtotal
          },
        }
      });
    } else {
      //TODO: change it to right notification
      console.log('You cannot add product');
    }
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
    const products = this.state.cart.products.concat();
    const currentTarget = event.currentTarget;
    this.setState((state) => {
      const choosenCurrency = currentTarget.dataset.currency;
      return {
        choosenCurrency: `${choosenCurrency}`,
        cart: {
          products: state.cart.products,
          total: countTotal(products, choosenCurrency),
          amountOfItems: state.cart.newAmountOfItems
        }
      }
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
      newTotal = countTotal(products, this.state.choosenCurrency);
      newAmountOfItems = this.state.cart.amountOfItems + 1;
    } else {
      products[indexOfProductForChange].amount--;
      newTotal = countTotal(products, this.state.choosenCurrency);
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

    handleAttributeClick(event) {
      let indexOfExistingAttribute,
          isExist = false;
      const choosenAttributes = this.state.choosenAttributes.concat();
      const choosenAttribute = {
        name: event.target.dataset.attribute,
        value: event.target.textContent
      }
      if(this.state.choosenAttributes.length === 0) {
        choosenAttributes.push(choosenAttribute);
      } else {
        const names = [];
        choosenAttributes.forEach(attribute => names.push(attribute.name));
        indexOfExistingAttribute = names.indexOf(choosenAttribute.name)
        if(indexOfExistingAttribute !== -1) {
          choosenAttributes.splice(indexOfExistingAttribute, 1, choosenAttribute);
        } else {
          choosenAttributes.push(choosenAttribute);
        }
      }
      this.setState({
        choosenAttributes: choosenAttributes
      })
    }

  render() {
    let page;
    if(this.state.itemIsClicked){
      page = <ProductPage
                choosenProduct={this.state.choosenProduct}
                handleAddToCartClick={this.handleAddToCartClick}
                choosenCurrency={this.state.choosenCurrency}
                handleAttributeClick={this.handleAttributeClick}
                choosenAttributes={this.state.choosenAttributes}
                cart={this.state.cart}/>
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
              choosenCurrency={this.state.choosenCurrency}
              handleAttributeClick={this.handleAttributeClick}
              choosenAttributes={this.state.choosenAttributes}/>
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
