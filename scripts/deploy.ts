import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const MintableERC20 = await hre.ethers.getContractFactory("MintableERC20");
    const token = await MintableERC20.deploy(deployer.address);
    await token.waitForDeployment();

    // Get and print the contract address
    const myContractDeployedAddress = await token.getAddress();
    console.log(`Deployed to ${myContractDeployedAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
