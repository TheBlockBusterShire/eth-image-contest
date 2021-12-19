import { deployNFTMinterContractContract } from "./contractResolver"

export default class NFTMinter {
    async init (web3) {
        try {
            this.web3 = web3
            this.accounts = await web3.eth.getAccounts()
            this.contractRaw = await deployNFTMinterContractContract(web3)
            console.log(this.contractRaw.methods)
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
            console.error(error)
      }
    }

    async mint(url) {
        await this.contractRaw.methods.create(url).send({ from: this.accounts[0] })
    }

    async getAll() {
        return this.contractRaw.methods.getAll().call()
    }
}
