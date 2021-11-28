import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import { deployImageStorageContract } from "./utils/contractResolver"

import "./App.css";

class App extends Component {
  state = { storageValue: null, web3: null, accounts: null, contract: null }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const imageStorageContract = await deployImageStorageContract(web3)
      this.setState({ web3, accounts, contract: imageStorageContract }, this.runExample)
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
      console.error(error)
    }
  };

  runExample = async () => {
    const { web3, accounts, contract } = this.state;

    const response = await contract.methods.get().call();

    console.log(response)
    this.setState({ storageValue: response });
  };

  addImage = async () => {
    await contract.methods.set(
      web3.utils.fromAscii("one"),
      "hash",
      "title"
    ).send({ from: accounts[0] });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
