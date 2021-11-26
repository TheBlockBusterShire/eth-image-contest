const ImageStorage = artifacts.require("../ImageStorage.sol");

contract("ImageStorage", accounts => {
  it("should store the images metadata", async () => {
    const imageStorage = await ImageStorage.deployed();

    const idOne = web3.utils.fromAscii("one")
    const idTwo = web3.utils.fromAscii("two")
    await imageStorage.set(idOne, "hash_one", "one")
    await imageStorage.set(idTwo, "hash_two", "two")

    const imageList = await imageStorage.get()
    assert.equal(imageList.length, 2, "Stored list has not right length.");
  })
});
