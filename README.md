# ETH image contest

This is a simple project to showcase usage of the smart contracts in the dapp.
- Upload images to IPFS and add its metadata to the ImageStorage.
- Allow voting on the images and store votes in VoteStorage.
- Mint NFTs from chosen images.

## Tools:
- node (tested on `v14.16.1`), npm (`6.14.6`)
- yarn (tested on `1.22.10`)
- truffle `npm install -g truffle`
- ganache `npm install -g ganache-cli`
- ipfs https://docs.ipfs.io/install/command-line

Project is based on the react box `truffle unbox react`.

## Setup
- Install dependencies `yarn install`
- Start local test-chain with ganache on 7545 `ganache-cli --port 7545`
- Compile contracts `truffle compile`
- Migrate contracts `truffle migrate`

- IPFS
  * Start local IPFS node `ipfs init`
  * Start local IPFS daemon `ipfs daemon` (by default on `http://localhost:5001`)
  * CORS:
  ```
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
  ```

## Others
- Unit tests `truffle test`
