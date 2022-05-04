// https://eth-ropsten.alchemyapi.io/v2/tlELk2rAej2v9kbQ_G2ONtFBTUhkvSsp

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/tlELk2rAej2v9kbQ_G2ONtFBTUhkvSsp",
      accounts: [process.env.ETHEREUM_TESTNET_PRIVATE_KEY], // address of account we will use to fund this contract
    },
  },
};
