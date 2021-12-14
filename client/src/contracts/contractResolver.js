import ImageVoterContract from "./build/ImageVoterContract.json";

export const deployImageVoterStorageContract = async (web3) => deployContract(web3, ImageVoterContract)

const deployContract = async (web3, contract) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];

    return new web3.eth.Contract(
        contract.abi,
        deployedNetwork && deployedNetwork.address,
    );
}
