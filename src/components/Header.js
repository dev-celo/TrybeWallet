import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <div>
          <span data-testid="total-field">
            {
              expenses.length > 0
                ? (expenses.reduce((acc, expense) => acc + (Number(expense.value)
                * expense.exchangeRates[expense.currency].ask), 0).toFixed(2))
                : '0.00'
            }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
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
