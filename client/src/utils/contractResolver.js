import ImageStorageContract from "../contracts/ImageStorage.json";

export const deployImageStorageContract = async (web3) => deployContract(web3, ImageStorageContract)

const deployContract = async (web3, contract) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];

    return new web3.eth.Contract(
        contract.abi,
        deployedNetwork && deployedNetwork.address,
    );
}
