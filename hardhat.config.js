require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url:'https://eth-sepolia.g.alchemy.com/v2/eIZRWGEx7xmJY6NqNojadcgf3fq_NtwW'
      ,
      accounts: ["2940fea7d923b2f225ad17ff8f7ac53f6954113d87baf0082778633a094cd030"],//enter private key
    },
  },
};