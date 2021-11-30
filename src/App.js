import './App.css';
import Header from './components/Header.js'
import CategoryPage from './components/CategoryPage.js'
import ProductPage from './components/ProductPage.js'
import CartOverlay from './components/CartOverlay.js'
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
      }
    }
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.handleHomePageClick = this.handleHomePageClick.bind(this);
    this.handleHeaderCartClick = this.handleHeaderCartClick.bind(this);
    this.hadleChangeAmountButtonClick = this.hadleChangeAmountButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.client
    .query({
      query: gql`
        query {
          categories {
            name
            products {
              id,
              name,
              inStock,
              gallery,
              prices {
                currency,
                amount
              },
              description,
              attributes {
                name,
                items {
                  value
                }
              }
            }
          }
        }`
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
          product(id: "${e.currentTarget.id}"){
            name,
            brand,
            prices {
              currency,
              amount
            },
            description
            inStock,
            gallery,
            category,
            attributes {
              name,
              type,
              items {
                value
              }
            }
          }
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
      const newTotal = state.cart.total + this.state.choosenProduct.prices[0].amount;
      return {
        cart: {
          products: products,
          amountOfItems:  newAmountOfItems,
          total: newTotal
        }
      }
    });
  }

  handleHomePageClick() {
    this.setState({
      homePageIconIsClicked: true,
      itemIsClicked: false
    });
  }

  handleHeaderCartClick() {
    this.setState({
      headerCartIconIsClicked: !this.state.headerCartIconIsClicked
    })
  }

  hadleChangeAmountButtonClick(event) {
    let products = this.state.cart.products.concat();
    let productForChange = products.filter(product =>
      product.product.name === event.target.dataset.productName
    );
    const indexOfProductForChange = products.indexOf(productForChange[0]);
    let newTotal;
    if(event.target.textContent === "+") {
      products[indexOfProductForChange].amount++;
      newTotal = this.state.cart.total + products[indexOfProductForChange].product.prices[0].amount;
    } else {
      products[indexOfProductForChange].amount--;
      newTotal = this.state.cart.total - products[indexOfProductForChange].product.prices[0].amount;
    }
    if(products[indexOfProductForChange].amount === 0) {
      products.splice(indexOfProductForChange, 1)
    }
    this.setState({
      cart: {
        products: products,
        total: newTotal,
        amountOfItems: this.state.cart.amountOfItems
      }
    })
  }

  render() {
    let page;
    if(this.state.itemIsClicked){
      page = <ProductPage
                choosenProduct={this.state.choosenProduct}
                handleAddToCartClick={this.handleAddToCartClick}/>
    } else if(this.state.homePageIconIsClicked){
      page = <CategoryPage
                categoryName={this.state.categoryName}
                products={this.state.products}
                handleProductClick={this.handleProductClick}/>
    }
    return (
      <div className="App">
        <Header
          handleHomePageClick={this.handleHomePageClick}
          handleHeaderCartClick={this.handleHeaderCartClick}/>
        {this.state.headerCartIconIsClicked && (
            <CartOverlay
              cart={this.state.cart}
              hadleChangeAmountButtonClick={this.hadleChangeAmountButtonClick}/>
        )}
        {page}
      </div>
    );
  }
}

export default App;
