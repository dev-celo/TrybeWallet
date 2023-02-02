// Coloque aqui suas actions
export const LOGIN_FORM_SUBMIT = 'PERSONAL_FORM_SUBMIT';
export const CURRENCY_FORM_SUBMIT = 'PROFESSIONAL_FORM_SUBMIT';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const submitPersonalProfie = (email) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: email,
});

const submitprofessionalProfie = (currency) => ({
  type: CURRENCY_FORM_SUBMIT,
  payload: currency,
});

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestSuccessful = (data) => (
  {
    type: REQUEST_SUCCESSFUL,
    payload: data,
  }
);

const requestFailed = (error) => ({
  type: REQUEST_SUCCESSFUL,
  payload: error,
});

// eslint-disable-next-line arrow-body-style
const fetchCurrency = () => {
  return (dispatch) => {
    dispatch(requestStarted());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const currency = Object.keys(data).filter((key) => key !== 'USDT');
        dispatch(requestSuccessful(currency));
      })
      .catch((error) => requestFailed(error));
  };
};

export { submitPersonalProfie, submitprofessionalProfie, fetchCurrency };
