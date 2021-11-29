import getWeb3 from "../utils/getWeb3";
import { deployImageVoterStorageContract } from "./contractResolver"

export default class ImageStorage {
    async init () {
        try {
            const web3 = await getWeb3()
            this.web3 = web3
            this.accounts = await web3.eth.getAccounts()
            this.contractRaw = await deployImageVoterStorageContract(web3)
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
            console.error(error)
      }
    }

    async getAll () {
        return this.contractRaw.methods.getImages().call();
    }

    async setImage () {
        await this.contractRaw.methods.setImage(
            this.web3.utils.fromAscii("one"),
            "hash",
            "title"
          ).send({ from: this.accounts[0] });
    }
}
