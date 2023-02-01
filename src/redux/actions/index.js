// Coloque aqui suas actions
export const LOGIN_FORM_SUBMIT = 'PERSONAL_FORM_SUBMIT';
export const CURRENCY_FORM_SUBMIT = 'PROFESSIONAL_FORM_SUBMIT';

const submitPersonalProfie = (email) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: email,
});

const submitprofessionalProfie = (currency) => ({
  type: CURRENCY_FORM_SUBMIT,
  payload: currency,
});

export { submitPersonalProfie, submitprofessionalProfie };
