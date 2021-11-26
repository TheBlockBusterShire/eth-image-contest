// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VoteStorage {
    struct Vote {
        address voterAddress;
        bytes32 imageId;
    }

    address[] internal voters;
    mapping(address => bytes32) votes;

    function set(bytes32 imageId) public {
        if (!userHasVoted()) voters.push(msg.sender);
        votes[msg.sender] = imageId;
    }

    function get() public view returns(Vote[] memory) {
        Vote[] memory result = new Vote[](voters.length);
        for (uint p = 0; p < voters.length; p++) {
            address voterAddress = voters[p];
            result[p] = Vote(voterAddress, votes[voterAddress]);
        }
        return result;
    }

    function burn() public {
        for (uint p = 0; p < voters.length; p++) {
            if (voters[p] == msg.sender) {
                voters[p] = voters[voters.length-1];
                voters.pop();
            }
        }
    }

    function userHasVoted() internal view returns(bool) {
        for (uint p = 0; p < voters.length; p++) {
            if (voters[p] == msg.sender) return true;
        }
        return false;
    }
}
