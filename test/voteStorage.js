const VoteStorage = artifacts.require("../VoteStorage.sol");

contract("VoteStorage", accounts => {
    const idOne = web3.utils.fromAscii("one")
    const idTwo = web3.utils.fromAscii("two")

    it("should store votes", async () => {
        const voteStorage = await VoteStorage.deployed();
    
        await voteStorage.set(idOne)
    
        const voteList = await voteStorage.get()
        const imageVoteFirst = voteList[0].imageId

        assert.equal(voteList.length, 1, "After add there is more/less than one element in the list.")

        await voteStorage.set(idTwo)
        const voteListUpdated = await voteStorage.get()
        const imageVoteUpdated = voteListUpdated[0].imageId
        assert.equal(voteListUpdated.length, 1, "After update there is more/less than one element in the list.") 
        assert.notEqual(imageVoteFirst, imageVoteUpdated, "ImageId is not updated")
  
        await voteStorage.burn()
        const voteListBurned = await voteStorage.get()
        assert.equal(voteListBurned.length, 0, "After removing the vote the vote list is not empty.")  
    })
})
