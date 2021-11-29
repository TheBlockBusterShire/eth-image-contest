const ImageVoterContract = artifacts.require("../ImageVoterContract.sol");

contract("ImageVoterContract", accounts => {
  it("should store the images metadata", async () => {
    const contract = await ImageVoterContract.deployed();

    const idOne = web3.utils.fromAscii("one")
    const idTwo = web3.utils.fromAscii("two")
    await contract.setImage(idOne, "hash_one", "one")
    await contract.setImage(idTwo, "hash_two", "two")

    const imageList = await contract.getImages()
    assert.equal(imageList.length, 2, "Stored list has not right length.");
  })

  it("should store votes", async () => {
    const idOne = web3.utils.fromAscii("one")
    const idTwo = web3.utils.fromAscii("two")
    const contract = await ImageVoterContract.deployed();

    await contract.setVote(idOne)

    const voteList = await contract.getVotes()
    const imageVoteFirst = voteList[0].imageId

    assert.equal(voteList.length, 1, "After add there is more/less than one element in the list.")

    await contract.setVote(idTwo)
    const voteListUpdated = await contract.getVotes()
    const imageVoteUpdated = voteListUpdated[0].imageId
    assert.equal(voteListUpdated.length, 1, "After update there is more/less than one element in the list.") 
    assert.notEqual(imageVoteFirst, imageVoteUpdated, "ImageId is not updated")

    await contract.burnVote()
    const voteListBurned = await contract.getVotes()
    assert.equal(voteListBurned.length, 0, "After removing the vote the vote list is not empty.")  
  })
});
