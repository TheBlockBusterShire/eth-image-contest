// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinterContract is ERC1155PresetMinterPauser, Ownable {
    uint256 public counter = 0;

    mapping(string => uint256) urls;
    mapping(uint256 => string) lookup;

    constructor() ERC1155PresetMinterPauser("") {}

    function create(string memory url) public onlyOwner {
        urls[url] = counter;
        lookup[counter] = url;
        _mint(msg.sender, counter, 1, "");
        counter++;
    }

    function getAll() public view returns (string[] memory) {
        string[] memory result = new string[](counter);
        for (uint256 p = 0; p <= counter; p++) {
            result[p] = lookup[p];
        }
        return result;
    }
}
