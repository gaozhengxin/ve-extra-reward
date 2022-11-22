pragma solidity ^0.8.0;

interface IVE {
    function balanceOfNFT(uint256 _tokenId) external view returns (uint256);

    function ownerOf(uint256) external view returns (address);
}

contract ve is IVE {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function balanceOfNFT(uint256 _tokenId) external view returns (uint256) {
        return 1000 ether;
    }

    function ownerOf(uint256) external view returns (address) {
        return owner;
    }
}
