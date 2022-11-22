pragma solidity ^0.8.0;

import "./Administrable.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);
}

contract Vault is Administrable {
    address public token;

    event Withdraw(uint256 amount, address to);

    constructor(address token_) {
        token = token_;
    }

    function balance() public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function withdraw(uint256 amount, address to)
        public
        onlyAdmin
        returns (bool)
    {
        bool succ = IERC20(token).transfer(to, amount);
        emit Withdraw(amount, to);
        return succ;
    }
}
