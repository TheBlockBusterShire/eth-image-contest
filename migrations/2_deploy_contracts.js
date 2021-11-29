var ImageVoterContract = artifacts.require("./ImageVoterContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageVoterContract);
};
