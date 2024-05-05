

const SimpleTradeContract = artifacts.require("SimpleTrade");

module.exports = function (deployer) {
  deployer.deploy(SimpleTradeContract);
};