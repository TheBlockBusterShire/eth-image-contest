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

    struct ImageVotingSummary {
        bytes32 imageId;
        uint256 voteCount;
    }

    address[] internal voters;
    mapping(address => bytes32) votes;

    bool isVotingCompletedValue = false;

    function setVote(bytes32 imageId) public {
        if (!userHasVoted()) voters.push(msg.sender);
        else if (votes[msg.sender] == imageId) removeVoter(msg.sender);

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

    function getVotingSummary()
        public
        view
        returns (ImageVotingSummary[] memory)
    {
        ImageVotingSummary[] memory result = new ImageVotingSummary[](
            imageIds.length
        );
        for (uint256 p = 0; p < imageIds.length; p++) {
            bytes32 imageId = imageIds[p];
            uint256 voteCount = 0;
            for (
                uint256 voterIndex = 0;
                voterIndex < voters.length;
                voterIndex++
            ) {
                address voterAddress = voters[voterIndex];
                if (votes[voterAddress] == imageId) voteCount++;
            }
            result[p] = ImageVotingSummary(imageId, voteCount);
        }
        return result;
    }

    function getWinnersImageIds() public view returns (bytes32[] memory) {
        ImageVotingSummary[] memory votingSummary = getVotingSummary();

        bytes32[] memory winnersImageIds = new bytes32[](0);
        uint256 winnerVotingCount = 0;
        for (uint256 p = 0; p < votingSummary.length; p++) {
            ImageVotingSummary memory imageVotingSummary = votingSummary[p];
            if (imageVotingSummary.voteCount == winnerVotingCount) {
                bytes32[] memory updatedWinnersImageIds = new bytes32[](
                    winnersImageIds.length + 1
                );
                for (uint256 index; index < winnersImageIds.length; index++) {
                    updatedWinnersImageIds[index] = winnersImageIds[index];
                }
                updatedWinnersImageIds[
                    updatedWinnersImageIds.length - 1
                ] = imageVotingSummary.imageId;
                winnersImageIds = updatedWinnersImageIds;
            }
            if (imageVotingSummary.voteCount > winnerVotingCount) {
                winnersImageIds = new bytes32[](1);
                winnersImageIds[0] = imageVotingSummary.imageId;
                winnerVotingCount = imageVotingSummary.voteCount;
            }
        }
        return winnersImageIds;
    }

    function enableVoting() public {
        isVotingCompletedValue = false;
    }

    function completeVoting() public {
        isVotingCompletedValue = true;
    }

    function isVotingCompleted() public view returns (bool) {
        return isVotingCompletedValue;
    }

    function userHasVoted() internal view returns (bool) {
        for (uint256 p = 0; p < voters.length; p++) {
            if (voters[p] == msg.sender) return true;
        }
        return false;
    }

    function removeVoter(address voter) internal {
        for (uint256 p = 0; p < voters.length; p++) {
            if (voters[p] == voter) {
                voters[p] = voters[voters.length - 1];
                voters.pop();
            }
        }
    }
    // --------------------------------------------------
}
