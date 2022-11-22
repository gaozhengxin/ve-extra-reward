pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract USDC is IERC20 {
    function transfer(address to, uint256 amount) external returns (bool) {
        return true;
    }
}
