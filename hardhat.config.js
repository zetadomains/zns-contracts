require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
 
module.exports = {
    solidity: {
        compilers: [
          {
            version: "0.8.20",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          }
        ]
    },
    paths: {
        artifacts: "./src",
    },
    networks: {
        zetachain: {
          url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
          accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        },
        zetachaintest: {
          url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
          accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        },
        sepolia: {
            //url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
            allowUnlimitedContractSize: true
        },
        goerli: {
            //url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
            allowUnlimitedContractSize: true,
        }
    },
    sourcify: {
      enabled: false
    },
    etherscan: {
        apiKey: process.env.ETHER_SCAN_API_KEY,
        customChains: [
          {
            network: "zetachain",
            chainId: 7000,
            urls: {
              apiURL: "https://zetachain.blockscout.com/api?module=contract&action=verify",
              browserURL: "https://zetachain.blockscout.com/"
            }
          },
          {
            network: "zetachaintest",
            chainId: 7001,
            urls: {
              apiURL: "https://zetachain-athens-3.blockscout.com/api?module=contract&action=verify",
              browserURL: "https://zetachain-athens-3.blockscout.com/"
            }
          }
        ]
    }
};