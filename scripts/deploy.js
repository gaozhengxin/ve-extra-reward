const hre = require("hardhat");

const OracleParams = {
    maxPrice: 5000000,
    minPrice: 1000000,
    router: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
    path: ["0x65ef703f5594d2573eb71aaf55bc0cb548492df4", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"]
}

const ve = "0xbbA4115ecB1F811061eCb5A8DC8FcdEE2748ceBa";
const usdc = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("owner " + owner.address);

    let MultiPriceOracle = await ethers.getContractFactory("MultiPriceOracle");
    let oracle = await MultiPriceOracle.deploy(OracleParams.maxPrice, OracleParams.minPrice, OracleParams.router, OracleParams.path);
    await oracle.deployed();
    console.log(`oracle ${oracle.address}`);

    let ExtraReward = await ethers.getContractFactory("ExtraReward");
    let extraReward = await ExtraReward.deploy(ve, oracle.address, usdc);
    await extraReward.deployed();
    console.log(`extraReward ${extraReward.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
