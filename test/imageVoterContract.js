const ImageVoterContract = artifacts.require("../ImageVoterContract.sol");

const hexToAsciiAndClean = (web3) => (value) => web3.utils.hexToAscii(value).replace(/\0/g, '')

contract("ImageVoterContract", accounts => {
  it("should store the images metadata", async () => {
    const contract = await ImageVoterContract.deployed();

    const idOne = web3.utils.asciiToHex("one")
    const idTwo = web3.utils.asciiToHex("two")
    await contract.setImage(idOne, "hash_one", "one")
    await contract.setImage(idOne, "hash_one", "one")
    await contract.setImage(idTwo, "hash_two", "two")

    const imageList = await contract.getImages()
    assert.equal(imageList.length, 2, "Stored list has not right length without dupications.");
  })
})
contract("ImageVoterContract VoteStorate", accounts => {
  const idOne = web3.utils.asciiToHex("one")
  const idTwo = web3.utils.asciiToHex("two")
  it("should init voting summary", async () => {
    // init the images in the contest
    const contract = await ImageVoterContract.deployed();
    await contract.setImage(idOne, "hash_one", "one")
    await contract.setImage(idTwo, "hash_two", "two")
    const votingSummary = await contract.getVotingSummary()
    assert.equal(votingSummary.length, 2, ".")
  })

  it("should store votes", async () => {
    // accounts[0] votes for the first image
    const contract = await ImageVoterContract.deployed();
    await contract.setVote(idOne, { from: accounts[0] })
    await contract.setVote(idOne, { from: accounts[1] })
    await contract.setVote(idOne, { from: accounts[2] })
    await contract.setVote(idTwo, { from: accounts[3] })
    const votingSummary = await contract.getVotingSummary()
    assert.equal(votingSummary[0].voteCount, 3, "The vote is not correctly counted")
    assert.equal(votingSummary[1].voteCount, 1, "The vote is not correctly counted")
  })
  it("should choose correct winner", async () => {
    const contract = await ImageVoterContract.deployed();
    const winnersImageIds = await contract.getWinnersImageIds()
    assert.equal(
      hexToAsciiAndClean(web3)(winnersImageIds[0]),
      web3.utils.hexToAscii(idOne),
      "The wrong winner was chosen"
    )
    await contract.setVote(idTwo, { from: accounts[2] })
    assert.equal(
      (await contract.getWinnersImageIds()).length,
      2,
      "When draw wrong number of winners is chosen"
    )
  })
  it("should allow to cancel the vote", async () => {
    const contract = await ImageVoterContract.deployed();
    await contract.setVote(idTwo, { from: accounts[2] })
    await contract.setVote(idTwo, { from: accounts[3] })
    const votingSummary = await contract.getVotingSummary()
    assert.equal(votingSummary[1].voteCount, 0, "The votes are not cancelled")
  })
  it("should allow to vote again", async () => {
    const contract = await ImageVoterContract.deployed();
    await contract.setVote(idTwo, { from: accounts[2] })
    const votingSummary = await contract.getVotingSummary()
    assert.equal(votingSummary[1].voteCount, 1, "User cannot vote again")
  })
});
