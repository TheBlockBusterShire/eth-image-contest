# ETH image contest

This is a simple project to showcase usage of the smart contracts in the dapp.
- Upload images to IPFS and add its metadata to the ImageStorage.
- Allow voting on the images and store votes in VoteStorage.
- Mint NFTs from chosen images.

## Tools:
- node (tested on `v12.18.3`), npm (`6.14.6`)
- truffle `npm install -g truffle`
- ganache `npm install -g ganache-cli`

Project is based on the react box `truffle unbox react`.

## Setup
- Start local test-chain with ganache on 7545 `ganache-cli --port 7545`
- Compile contracts `truffle compile`
- Migrate contracts `truffle migrate`

## Others
- Unit tests `truffle test`
