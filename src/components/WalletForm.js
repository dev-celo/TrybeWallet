import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          id="value"
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
        />

        <select data-testid="currency-input" id="currencies" name="currency">
          {
            currencies.length > 0 && currencies.map((currency, index) => (
              <option value={ currency } key={ `${currency}__${index}` }>
                {currency}
              </option>
            ))
          }
        </select>

        <select data-testid="method-input" id="method" name="method">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>

        <select data-testid="tag-input" id="tag" name="tag">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
