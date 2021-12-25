var ImageVoterContract = artifacts.require("./ImageVoterContract.sol");
var NFTMinterContract = artifacts.require("./NFTMinterContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageVoterContract);
  deployer.deploy(NFTMinterContract);
};
