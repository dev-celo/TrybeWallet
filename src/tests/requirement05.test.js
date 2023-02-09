import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => mockData,
  });
});

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  test('Testa se existe o input de email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('Testa se existe o input de password', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId(/password-input/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Testa se existe o button entrar', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { value: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Testa se os valores digitados vão para o estado global', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByTestId(/password-input/i);

    const button = screen.getByRole('button', { name: 'Entrar' });
    const email = 'trybe@trybe.com';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const emailRedux = store.getState().user.email;
    expect(emailRedux).toBe(email);

    const passwordRedux = store.getState().user.password;
    expect(passwordRedux).toBe('123456');
  });

  it('Testa se o email é exibido no componente Header', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { user: { email: 'trybe@trybe.com.br', password: '123456' } } },
    );
    const emailHeader = screen.getByTestId('email-field').textContent;
    expect(emailHeader).toBe(store.getState().user.email);
  });

  it('Testa se o total é exibido no componente Header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const totalHeader = screen.getByTestId('total-field');

    expect(totalHeader).toBeInTheDocument();
    expect(totalHeader.textContent).toBe('0.00');
  });

  test('Testa value input da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();
  });

  test('Testa currency input da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
  });

  test('Testa method-input da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();
  });

  test('Testa tag da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
  });

  test('Testa tag da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();
  });

  test('Testa button da wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const button = screen.getByText('Adicionar despesa');
    expect(button).toBeInTheDocument();
  });
});
