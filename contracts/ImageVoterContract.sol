// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImageVoterContract {
    // ImageStorage -------------------------------------
    struct ImageMetadata {
        bytes32 id;
        string ipfsPath;
        string title;
        uint256 createdAt;
    }

    address owner;

    bytes32[] internal imageIds;
    mapping(bytes32 => ImageMetadata) public images;

    constructor() {
        owner = msg.sender;
    }

    function setImage(
        bytes32 id,
        string memory ipfsPath,
        string memory title
    ) public {
        for (uint256 p = 0; p < imageIds.length; p++) {
            if (imageIds[p] == id) return;
        }
        ImageMetadata memory imageMetadata = ImageMetadata(
            id,
            ipfsPath,
            title,
            block.timestamp
        );

        imageIds.push(id);
        images[id] = imageMetadata;
    }

    function getImages() public view returns (ImageMetadata[] memory) {
        ImageMetadata[] memory result = new ImageMetadata[](imageIds.length);
        for (uint256 p = 0; p < imageIds.length; p++) {
            bytes32 id = imageIds[p];
            result[p] = images[id];
        }
        return result;
    }

    function burn(bytes32 id) public {
        require(
            msg.sender == owner,
            "You are not allowed to remove image, only owner of smart contract can remove images."
        );

        for (uint256 p = 0; p < imageIds.length; p++) {
            if (imageIds[p] == id) {
                imageIds[p] = imageIds[imageIds.length - 1];
                imageIds.pop();
            }
        }
    }

    // --------------------------------------------------

    // VoteStorage --------------------------------------
    struct Vote {
        address voterAddress;
        bytes32 imageId;
    }

    address[] internal voters;
    mapping(address => bytes32) votes;

    function setVote(bytes32 imageId) public {
        if (!userHasVoted()) voters.push(msg.sender);
        votes[msg.sender] = imageId;
    }

    function getVotes() public view returns (Vote[] memory) {
        Vote[] memory result = new Vote[](voters.length);
        for (uint256 p = 0; p < voters.length; p++) {
            address voterAddress = voters[p];
            result[p] = Vote(voterAddress, votes[voterAddress]);
        }
        return result;
    }

    function burnVote() public {
        for (uint256 p = 0; p < voters.length; p++) {
            if (voters[p] == msg.sender) {
                voters[p] = voters[voters.length - 1];
                voters.pop();
            }
        }
    }

    function userHasVoted() internal view returns (bool) {
        for (uint256 p = 0; p < voters.length; p++) {
            if (voters[p] == msg.sender) return true;
        }
        return false;
    }
    // --------------------------------------------------
}
