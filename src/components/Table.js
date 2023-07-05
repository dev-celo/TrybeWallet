import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCoast } from '../redux/actions';
import './table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div
        className="
        table-responsive-md
        background-color
      "
      >
        <table className="table">
          <thead className="header-table">
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Gastou com</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
              && expenses.map((expense) => (
                <tr className="background-color" key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => {
                        dispatch(deleteCoast(expense.id));
                      } }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      exchangeRates: PropTypes.arrayOf.isRequired,
    }),
  ).isRequired,
};
const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);
