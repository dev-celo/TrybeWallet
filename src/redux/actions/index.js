// Ações de login
export const LOGIN_FORM_SUBMIT = 'PERSONAL_FORM_SUBMIT';

const submitPersonalProfie = (email) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: email,
});

// Ações de Moeda

export const CURRENCY_FORM_SUBMIT = 'PROFESSIONAL_FORM_SUBMIT';
export const REQUEST_EXCHANGE = 'REQUEST_EXCHANGE';

const submitprofessionalProfie = (currency) => ({
  type: CURRENCY_FORM_SUBMIT,
  payload: currency,
});

// Outras ações
export const DELETE = 'DELETE';

const deleteCoast = (idValue) => ({
  type: DELETE,
  payload: idValue,
});

export const REQUEST_STARTED = 'REQUEST_STARTED';

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';

const requestSuccessful = (data) => (
  {
    type: REQUEST_SUCCESSFUL,
    payload: data,
  }
);

export const REQUEST_FAILED = 'REQUEST_FAILED';

const requestFailed = (error) => ({
  type: REQUEST_SUCCESSFUL,
  payload: error,
});

const fetchCurrency = () => (dispatch) => {
  dispatch(requestStarted());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      dispatch(requestSuccessful(data));
    })
    .catch((error) => requestFailed(error));
};

export {
  submitPersonalProfie,
  submitprofessionalProfie,
  fetchCurrency,
  deleteCoast,
  requestStarted,
  requestSuccessful,
  requestFailed,
};
