const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const mnemonic = process.env.MNEMONIC;
const alchemyApiUrl = process.env.ALCHEMY_API_URL;

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, alchemyApiUrl),
      network_id: 11155111,
      gas: 5500000,
      gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  contracts_directory: "./code",
  migrations_directory: "./deployment",
  compilers: {
    solc: {
      version: "0.8.12",
    },
  },
};
