import React, { Component } from 'react'
import AddCreditCard from './containers/AddCreditCard'
import CreditCardList from './containers/CreditCardList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container" style={{ marginTop: "10px" }} >
          <div className="row">
            <div className="col-lg-10 offset-lg-2 col-md-10 col-sm-12 col-xs-12">
              <h2>Credit Card System</h2>
              <AddCreditCard />
            </div>
            <CreditCardList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
