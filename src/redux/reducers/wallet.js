// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCY_FORM_SUBMIT,
  REQUEST_SUCCESSFUL,
  REQUEST_STARTED,
  DELETE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_FORM_SUBMIT:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
          exchangeRates: state.exchangeRates,
        },
      ],
    };

  case REQUEST_STARTED:
    return {
      ...state,
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((key) => key !== 'USDT'),
      exchangeRates: action.payload,
    };

  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      //  expenses: state.expenses.splice(action.payload, 1),
    };
  default:
    return state;
  }
};

export default wallet;
