import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { fetchCurrency } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    fetchCurrency();
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
