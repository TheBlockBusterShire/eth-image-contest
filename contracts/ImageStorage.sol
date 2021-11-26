// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ImageStorage {
    struct ImageMetadata {
        bytes32 id;
        string imagehash;
        string title;
        uint256 createdAt;
    }

    address owner;

    bytes32[] internal imageIds;
    mapping(bytes32 => ImageMetadata) public images;

    constructor() {
        owner = msg.sender;
    }

    function getImageHash(bytes32 id) public view returns (string memory) {
        return images[id].imagehash;
    }

    function getImages() public view returns(ImageMetadata [] memory) {
        ImageMetadata[] memory result = new ImageMetadata[](imageIds.length);
        for (uint p = 0; p < imageIds.length; p++) {
            bytes32 id = imageIds[p];
            result[p] = images[id];
        }
        return result;
    }

    function removeImage(bytes32 id) public {
        require(
            msg.sender == owner,
            "You are not allowed to remove image, only owner of smart contract can remove images."
        );

        for (uint p = 0; p < imageIds.length; p++) {
            if (imageIds[p] == id) {
                imageIds[p] = imageIds[imageIds.length-1];
                imageIds.pop();
            }
        }
    }

    function set(
        bytes32 id,
        string memory imagehash,
        string memory title
    ) public {
        ImageMetadata memory imageMetadata = ImageMetadata(
            id,
            imagehash,
            title,
            block.timestamp
        );

        imageIds.push(id);
        images[id] = imageMetadata;
    }
}
