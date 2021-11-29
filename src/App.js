import './App.css';
import Header from './components/Header.js'
import CategoryPage from './components/CategoryPage.js'
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
    return (
      <div className="App">
        <Header
          handleHomePageClick={this.handleHomePageClick}
          handleHeaderCartClick={this.handleHeaderCartClick}/>
        <CategoryPage
          categoryName={this.state.categoryName}
          products={this.state.products}/>
      </div>
    );
  }
}

export default App;
