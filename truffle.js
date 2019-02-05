module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 7000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};