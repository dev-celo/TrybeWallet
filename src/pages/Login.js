import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, submitPersonalProfie } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validForm);
  };

  validForm = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/i;
    const minLength = 5;

    console.log(this.state);
    if (regex.test(email) && password.length > minLength) {
      this.setState({ isDisable: false });
      return;
    }
    this.setState({ isDisable: true });
  };

  render() {
    const { email, password, isDisable } = this.state;
    const { history, dispatch } = this.props;
    return (
      <div>
        <input
          onChange={ this.handleChange }
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={ email }
          required
          data-testid="email-input"
        />
        <input
          onChange={ this.handleChange }
          type="password"
          name="password"
          id="password"
          value={ password }
          required
          data-testid="password-input"
        />
        <button
          disabled={ isDisable }
          onClick={ () => {
            dispatch(submitPersonalProfie({ email, password }));
            dispatch(fetchCurrency());
            return history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
