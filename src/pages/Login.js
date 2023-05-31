import React from 'react';
import './login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineMail } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import { fetchCurrency, submitPersonalProfie } from '../redux/actions';
import logo from '../assets/logo.png';

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
      <div
        className="
        background-color
        min-vh-100
        d-flex
        flex-column
        align-items-center
        justify-content-center"
      >
        <img src={ logo } alt="trybeWallet Logo " />
        <div
          className="
          d-flex
          flex-column
          justify-content-center
          align-item-center
          mx-auto w-50
          border-top-0
          background-login
          glass
          "
        >
          <div className="w-75 d-flex flex-row align-items-center mb-3 mx-auto">
            <input
              className="p-1 rounded w-100"
              onChange={ this.handleChange }
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={ email }
              required
              data-testid="email-input"
            />
            <AiOutlineMail className="emailIcon" />
          </div>
          <div className="w-75 d-flex flex-row align-items-center mb-5 mx-auto">
            <input
              className="p-1 rounded w-100"
              onChange={ this.handleChange }
              type="password"
              name="password"
              placeholder="password"
              id="password"
              value={ password }
              required
              data-testid="password-input"
            />
            <MdPassword className="passwordIcon" />
          </div>

          <button
            className="btn btn-primary btn-lg w-50  mx-auto"
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
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: '',
  dispatch: '',
};

export default connect()(Login);
