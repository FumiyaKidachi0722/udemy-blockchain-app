//https://eth-goerli.g.alchemy.com/v2/rofPdB4qpTVCDJFLOFKncno1DtLdLRWl
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/rofPdB4qpTVCDJFLOFKncno1DtLdLRWl",
      accounts: [
        "df36c7401b62b19b9d2e6dbfb8e131f4b9d5e4d6bfe11bf0d813a2d221106d51",
      ],
    },
  },
};
