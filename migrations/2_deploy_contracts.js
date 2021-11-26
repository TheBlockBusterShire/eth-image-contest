var ImageStorage = artifacts.require("./ImageStorage.sol");
var VoteStorage = artifacts.require("./VoteStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageStorage);
  deployer.deploy(VoteStorage)
};
