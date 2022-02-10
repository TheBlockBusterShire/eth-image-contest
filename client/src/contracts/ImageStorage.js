import { deployImageVoterStorageContract } from "./contractResolver"

export default class ImageStorage {
    async init (web3) {
        try {
            this.web3 = web3
            this.accounts = await web3.eth.getAccounts()
            this.contractRaw = await deployImageVoterStorageContract(web3)
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
            console.error(error)
      }
    }

    async isOwner () {
        return this.contractRaw.methods.isOwner().call()
    }

    async getAll () {
        return this.contractRaw.methods.getImages().call()
    }

    async setImage (ipfsPath, filename) {
        await this.contractRaw.methods.setImage(
            this.web3.utils.fromAscii(filename),
            ipfsPath,
            filename
          ).send({ from: this.accounts[0] })
    }
}
