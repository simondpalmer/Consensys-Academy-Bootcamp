const path = require("path");
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env["NEMONIC"];
var tokenkey = process.env["ENDPOINT_KEY"];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: "8545",
      network_id: "*"
    },
    rinkeby: {
      host: "127.0.0.1",
      provider: function() {
        return new HDWalletProvider( mnemonic, "https://rinkeby.infura.io/v3/" + tokenkey,1)
      },
      network_id: 4,
      gas: 4612388,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "^0.6.0", // A version or constraint - Ex. "^0.5.0"
                         // Can also be set to "native" to use a native solc
    }
  }
};
