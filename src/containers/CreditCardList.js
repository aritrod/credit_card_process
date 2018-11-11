import React from 'react';

class CreditCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cards: [] };
    this.headers = [
      { key: 'cardName', label: 'Name' },
      { key: 'cardNumber', label: 'Card Number' },
      { key: 'cardBalance', label: 'Balance' },
      { key: 'cardLimit', label: 'Limit' }
    ];
  }

  componentDidMount() {
    fetch('http://localhost:8080/sapient/creditCard/list')
      .then(response => {
        return response.json();
      }).then(result => {
        this.setState({
          cards: result.data
        });
      });
  }

  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        <h3>Existing Cards</h3>
        {this.state.cards.length !== 0 ? (
          <table
            style={{ marginTop: "30px" }}
            className="table table-hover table-dark"
          >
            <thead>
              <tr>
                {
                  this.headers.map(function (h) {
                    return (
                      <th key={h.key}>{h.label}</th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {this.state.cards.map(item => (
                <tr key={item.id}>
                  <td>
                    {item.cardName}
                  </td>
                  <td>
                    {item.cardNumber}
                  </td>
                  <td>
                    £{item.cardBalance}
                  </td>
                  <td>
                    £{item.cardLimit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
            <div
              style={{ marginTop: "50px" }}
              className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
            >
              <div className="alert alert-danger" role="alert">
                There are no cards to show
        </div>
            </div>
          )}{" "}
      </div>
    )
  }
}

export default CreditCardList;