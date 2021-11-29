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
      choosenProduct: ''
    }
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleHomePageClick = this.handleHomePageClick.bind(this);
    this.handleHeaderCartClick = this.handleHeaderCartClick.bind(this);
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

  handleHomePageClick() {
    this.setState({
      homePageIconIsClicked: true,
      itemIsClicked: false
    });
  }

  handleHeaderCartClick() {
    this.setState({
      headerCartIconIsClicked: true
    })
  }

  render() {
    let page;
    if(this.state.itemIsClicked){
      page = <ProductPage
                product={this.state.choosenProduct}/>
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
        {page}
      </div>
    );
  }
}

export default App;
