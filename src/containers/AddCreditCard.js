import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../actions/actionCreator'
import { bindActionCreators } from 'redux'

class AddCreditCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      successMessage: '',
      errorMessage: '',
      cardName: '',
      cardNumber: '',
      cardLimit: '',

    }
    this.onChangeCardName = this.onChangeCardName.bind(this)
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this)
    this.onChangeCardLimit = this.onChangeCardLimit.bind(this)
    this.addCreditCard = this.addCreditCard.bind(this)
  }

  onChangeCardName(e) {
    this.setState({
      cardName: e.target.value
    })
  }

  onChangeCardNumber(e) {
    this.setState({
      cardNumber: e.target.value
    })
  }

  onChangeCardLimit(e) {
    this.setState({
      cardLimit: e.target.value
    })
  }

  isEmpty(value) {
    return (null == value || '' === value || '' === value || undefined === value) ? true : false;
  }

  validateCard(value) {
    if (/[^0-9-\s]+/.test(value)) return false;

    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }

  addCreditCard(cardName, cardNumber, cardLimit) {
    let isCardValid = this.validateCard(cardNumber);
    if (isCardValid && !this.isEmpty(cardName) && !this.isEmpty(cardLimit)) {
      let postData = {
        "cardName": cardName,
        "cardNumber": cardNumber,
        "cardBalance": "0",
        "cardLimit": cardLimit
      }
      this.post(postData, 'http://localhost:8080/sapient/creditCard/add').then(cardAdded => {
        if (cardAdded < 1) {
          this.setState({
            errorMessage: 'Card addition failed!',
            successMessage: ''
          });
        } else if (cardAdded > 0) {
          this.setState({ cardName: '', cardNumber: '', cardLimit: '' });
          this.setState({
            successMessage: 'Card added successfully!',
            errorMessage: ''
          });
        }
      })

    } else if (!isCardValid) {
      this.setState({
        errorMessage: 'Card number is invalid!',
        successMessage: ''
      });
    } else {
      this.setState({
        errorMessage: 'Please make sure to fill in all card details!',
        successMessage: ''
      });
    }

  }

  post(data, endpoint) {
    return fetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(result => {
      console.log('added card : ' + result.data);
      return result.data;
    }).catch((reason) => {
      console.log('Error - ' + reason);
      // throw reason;
    });
  }

  render() {
    return (
      <div className="form-group row">
        <div className="col-sm-6">
          <span style={{ color: "GREEN" }}>{this.state.successMessage}</span>
          <span style={{ color: "RED" }}>{this.state.errorMessage}</span><br></br>
          <label for="cardName">Name</label>
          <input onChange={this.onChangeCardName} value={this.state.cardName} type="text" className="form-control" id="cardName" placeholder="Please add card name" />
          <label for="cardNumber">Card Number</label>
          <input onChange={this.onChangeCardNumber} value={this.state.cardNumber} type="text" className="form-control" id="cardName" placeholder="Please add card number" />
          <label for="cardLimit">Limit</label>
          <input onChange={this.onChangeCardLimit} value={this.state.cardLimit} type="text" className="form-control" id="cardName" placeholder="Please add card limit" />
          <button type="button" onClick={() => {
            this.addCreditCard(this.state.cardName, this.state.cardNumber, this.state.cardLimit);
          }} style={{ marginTop: "25px" }} className="btn btn-success">Add Card</button>
        </div>
      </div>
    );
  }
}


export default AddCreditCard;