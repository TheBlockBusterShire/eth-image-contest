import getWeb3 from "../utils/getWeb3";
import { deployImageVoterStorageContract } from "./contractResolver"

export default class VoteStorage {
    async init (web3) {
        try {
            this.accounts = await web3.eth.getAccounts()
            this.contractRaw = await deployImageVoterStorageContract(web3)
            console.log(this.contractRaw)
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
            console.error(error)
      }
    }

    async getAll () {
        return this.contractRaw.methods.getVotes().call()
    }

    async setVote (imageId) {
        await this.contractRaw.methods.setVote(imageId).send({ from: this.accounts[0] })
    }
}
