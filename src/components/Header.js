import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from '../assets/logo.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    if (!email) {
      return <Redirect to="/" />;
    }

    const space = {
      'margin-right': '10px',
    };

    return (
      <header
        className="
        d-flex
        justify-content-around
        align-items-center
        p-3
        background-color
        header"
      >
        <img className="logo" src={ Logo } alt="Logo trybewallets" />
        <div data-testid="email-field">{email}</div>
        <div>
          <span data-testid="total-field">
            <span style={ space }>Gastos</span>
            {
              expenses.length > 0
                ? (expenses.reduce((acc, expense) => acc + (Number(expense.value)
                * expense.exchangeRates[expense.currency].ask), 0).toFixed(2))
                : '0.00'
            }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
