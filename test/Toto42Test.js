const Toto42 = artifacts.require("Toto42");

contract("Toto42", (accounts) => {
  const [owner, account1, account2] = accounts;

  it("should get the total supply", async () => {
    const instance = await Toto42.deployed();
    const supply = await instance.totalSupply();
    console.log("Total supply:", web3.utils.fromWei(supply, "ether"));
  });

  it("should get the name of the token", async () => {
    const instance = await Toto42.deployed();
    const name = await instance.name();
    console.log("Token name:", name);
  });

  it("should get the symbol of the token", async () => {
    const instance = await Toto42.deployed();
    const symbol = await instance.symbol();
    console.log("Token symbol:", symbol);
  });

  it("should get the decimals of the token", async () => {
    const instance = await Toto42.deployed();
    const decimals = await instance.decimals();
    console.log("Token decimals:", decimals.toString());
  });

  it("should mint tokens to an account", async () => {
    const instance = await Toto42.deployed();
    const amount = web3.utils.toWei("100", "ether"); // Mint 100 tokens
    await instance.mint(account1, amount, { from: owner });

    const balance = await instance.balanceOf(account1);
    console.log(
      "Balance of account1 after minting:",
      web3.utils.fromWei(balance, "ether")
    );
  });

  it("should transfer tokens between accounts", async () => {
    const instance = await Toto42.deployed();
    const transferAmount = web3.utils.toWei("1", "ether"); // 1 token

    await instance.transfer(account2, transferAmount, { from: account1 });

    const balanceAccount1 = await instance.balanceOf(account1);
    const balanceAccount2 = await instance.balanceOf(account2);
    console.log(
      "Balance of account1 after transfer:",
      web3.utils.fromWei(balanceAccount1, "ether")
    );
    console.log(
      "Balance of account2 after transfer:",
      web3.utils.fromWei(balanceAccount2, "ether")
    );
  });

  it("should approve allowance", async () => {
    const instance = await Toto42.deployed();
    const approveAmount = web3.utils.toWei("0.01", "ether");

    await instance.approve(account2, approveAmount, { from: account1 });

    const allowance = await instance.allowance(account1, account2);
    console.log(
      "Allowance from account1 to account2:",
      web3.utils.fromWei(allowance, "ether")
    );
  });

  it("should transfer tokens using allowance", async () => {
    const instance = await Toto42.deployed();
    const transferAmount = web3.utils.toWei("0.001", "ether");

    await instance.transferFrom(account1, account2, transferAmount, {
      from: account2,
    });

    const balanceAccount1 = await instance.balanceOf(account1);
    const balanceAccount2 = await instance.balanceOf(account2);
    console.log(
      "Balance of account1 after transferFrom:",
      web3.utils.fromWei(balanceAccount1, "ether")
    );
    console.log(
      "Balance of account2 after transferFrom:",
      web3.utils.fromWei(balanceAccount2, "ether")
    );
  });

  it("should burn tokens from account1 by the owner", async () => {
    const instance = await Toto42.deployed();
    const burnAmount = web3.utils.toWei("98", "ether"); // Montant à brûler

    await instance.approve(owner, burnAmount, { from: account1 });

    await instance.burnFrom(account1, burnAmount, { from: owner });

    const balanceAccount1 = await instance.balanceOf(account1);
    console.log(balanceAccount1.amount);

    console.log(
      "Balance of account1 after burning:",
      web3.utils.fromWei(balanceAccount1, "ether")
    );

    assert.equal(
      web3.utils.fromWei(balanceAccount1, "ether"),
      "0.999",
      "The balance after burning should be 0"
    );
  });
});
