import './App.css';
import Header from './components/Header.js'
import React from 'react';
import {gql} from "@apollo/client";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName:'',
      products: [],
      homePageIconIsClicked: true,
      headerCartIconIsClicked: false,
    }
    this.handleHomePageClick = this.handleHomePageClick.bind(this);
    this.handleHeaderCartClick = this.handleHeaderCartClick.bind(this);
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
      </div>
    );
  }
}

export default App;
