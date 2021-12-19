// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC1155PresetMinterPauser, Ownable {
    uint256 public idCounter;

    mapping(string => uint256) ids;
    mapping(uint256 => string) lookup;

    constructor() ERC1155PresetMinterPauser("ipfs://{id}") {}

    function mint(string memory id) public onlyOwner {
        ids[id] = idCounter;
        lookup[idCounter] = id;
        _mint(msg.sender, idCounter, 1, "");
        idCounter++;
    }

    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked(super.uri(id), lookup[id], ""));
    }

    function getAll() public view returns (string[] memory) {
        string[] memory result = new string[](idCounter);
        for (uint256 p = 0; p <= idCounter; p++) {
            result[p] = lookup[p];
        }
        return result;
    }
}
