import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
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
        />
        <input
          onChange={ this.handleChange }
          type="password"
          name="password"
          id="password"
          value={ password }
          required
        />
        <button>Entrar</button>
      </div>
    );
  }
}

export default Login;
