const { expect } = require("chai");
const { mine } = require("@nomicfoundation/hardhat-network-helpers");

describe("Extra reward", function () {
    it("Extra reward", async function () {
        const [owner] = await ethers.getSigners();
        console.log(`owner : ${owner.address}`);

        let VE = await ethers.getContractFactory("ve");
        let ve = await VE.deploy();
        await ve.deployed();

        let MultiPriceOracleMock = await ethers.getContractFactory("MultiPriceOracleMock");
        let oracle = await MultiPriceOracleMock.deploy();
        await oracle.deployed();

        let USDC = await ethers.getContractFactory("USDC");
        let usdc = await USDC.deploy();
        await usdc.deployed();

        let ExtraReward = await ethers.getContractFactory("ExtraReward");
        let extraReward = await ExtraReward.deploy(ve.address, oracle.address, usdc.address);
        await extraReward.deployed();

        await extraReward.setExtraReward(1);
        let rewardInfo_1 = await extraReward.rewardInfos(1);
        console.log(`reward info 1 : ${rewardInfo_1}`);
        expect(rewardInfo_1[0]).to.equal(true);
        expect(rewardInfo_1[1]).to.above(1669000000);
        expect(rewardInfo_1[2]).to.equal("1000000000000000000000");

        await mine(52, { interval: 604800 }); // about 1 year

        var reward = await extraReward.getReward(1);
        console.log(`reward : ${reward}`);
        expect(reward).to.above(148000000);
        expect(reward).to.below(152000000);

        await mine(52, { interval: 604800 }); // about 1 year
        await mine(52, { interval: 604800 }); // about 1 year
        await mine(52, { interval: 604800 }); // about 1 year
        reward = await extraReward.getReward(1);
        console.log(`reward : ${reward}`);
        expect(reward).to.equal(500000000);
    }
    )
});