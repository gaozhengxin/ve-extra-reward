pragma solidity ^0.8.0;

interface IMultiPriceOracle {
    function getMultiPrice() external view returns (uint256 multiPrice);
}

contract MultiPriceOracleMock is IMultiPriceOracle {
    function getMultiPrice() public view returns (uint256 multiPrice) {
        multiPrice = 3 * 1e6;
        return multiPrice;
    }
}
