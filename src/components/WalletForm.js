import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchCurrency, submitprofessionalProfie } from '../redux/actions';
import './wallet.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validForm);
  };

  render() {
    const { currencies, dispatch } = this.props;

    if (currencies.length === 0) {
      return <Redirect to="/" />;
    }

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form
        className="
        d-flex
        flex-column
        background-color
        header
        justify-content-center
        align-items-center
        gap-3
        p-5"
      >
        <input
          placeholder="Digite o valor"
          className="input"
          onChange={ this.handleChange }
          data-testid="value-input"
          type="number"
          name="value"
          id="value"
        />
        <input
          className="input"
          onChange={ this.handleChange }
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
        />

        <select
          onChange={ this.handleChange }
          data-testid="currency-input"
          id="currencies"
          name="currency"
        >
          {
            currencies.length > 0 && currencies.map((curr, index) => (
              <option value={ curr } key={ `${curr}__${index}` }>
                {curr}
              </option>
            ))
          }
        </select>

        <select
          onChange={ this.handleChange }
          data-testid="method-input"
          id="method"
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>

        <select
          onChange={ this.handleChange }
          data-testid="tag-input"
          id="tag"
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          className="btn btn-primary w-25"
          onClick={ (event) => {
            event.preventDefault();
            dispatch(submitprofessionalProfie(
              {
                value,
                description,
                currency,
                method,
                tag,
              },
            ));
            dispatch(fetchCurrency());
            document.querySelector('#value').value = '';
            document.querySelector('#description').value = '';
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
