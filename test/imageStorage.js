const ImageStorage = artifacts.require("../ImageStorage.sol");

contract("ImageStorage", accounts => {
  it("should store the images metadata", async () => {
    const imageStorage = await ImageStorage.deployed();

    const idOne = web3.utils.fromAscii("one")
    const idTwo = web3.utils.fromAscii("two")
    await imageStorage.set(idOne, "hash_one", "one")
    await imageStorage.set(idTwo, "hash_two", "two")

    const imageList = await imageStorage.getImages.call()
    assert.equal(imageList.length, 2, "Stored list has not right length.");
  })

  it("should allow querying image hash by id", async () => {
    const imageStorage = await ImageStorage.deployed();

    const idOne = web3.utils.fromAscii("one")
    await imageStorage.set(idOne, "hash_one", "one")

    const imageTwoHash = await imageStorage.getImageHash.call(idOne)
    assert.equal(imageTwoHash, "hash_one", "Requested hash is not correct")
  })
});
