const HelloWorld = artifacts.require("./Toto42.sol");
const DocumentRegistry = artifacts.require("./DocumentRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(HelloWorld);

  const HelloWorld_instance = HelloWorld.deployed();

  deployer.deploy(DocumentRegistry);

  const DocumentRegistry_instance = DocumentRegistry.deployed();
};
