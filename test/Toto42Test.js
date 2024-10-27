const Toto42 = artifacts.require("Toto42");

contract("Toto42", (accounts) => {
  const [owner, myAccount, yourAccount] = accounts;

  it("should get total supply", async () => {
    const instance = await Toto42.deployed();
    const supply = await instance.totalSupply();
    console.log("Total supply:", web3.utils.fromWei(supply, "ether"));
  });

  it("should get token name", async () => {
    const instance = await Toto42.deployed();
    const name = await instance.name();
    console.log("Token name:", name);
  });

  it("should get token symbol", async () => {
    const instance = await Toto42.deployed();
    const symbol = await instance.symbol();
    console.log("Token symbol:", symbol);
  });

  it("should get token decimals", async () => {
    const instance = await Toto42.deployed();
    const decimals = await instance.decimals();
    console.log("Token decimals:", decimals.toString());
  });

  it("should mint tokens to an account", async () => {
    const instance = await Toto42.deployed();
    const amount = web3.utils.toWei("100", "ether");
    await instance.mint(myAccount, amount, { from: owner });

    const balance = await instance.balanceOf(myAccount);
    console.log(
      "Balance of myAccount after minting:",
      web3.utils.fromWei(balance, "ether")
    );
  });

  it("should transfer tokens between accounts", async () => {
    const instance = await Toto42.deployed();
    const transferAmount = web3.utils.toWei("1", "ether");

    await instance.transfer(yourAccount, transferAmount, { from: myAccount });

    const balanceAccount1 = await instance.balanceOf(myAccount);
    const balanceAccount2 = await instance.balanceOf(yourAccount);
    console.log(
      "Balance of myAccount after transfer:",
      web3.utils.fromWei(balanceAccount1, "ether")
    );
    console.log(
      "Balance of yourAccount after transfer:",
      web3.utils.fromWei(balanceAccount2, "ether")
    );
  });
});
