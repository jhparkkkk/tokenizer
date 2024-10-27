const DocumentRegistry = artifacts.require("DocumentRegistry");

contract("DocumentRegistry", (accounts) => {
  const ownerAccount = accounts[0];
  const nonOwnerAccount = accounts[1];

  const documentHash =
    "6a2128aaf3197e455f54921fe54f75eef76e003488fbbbe644996bc5ee9059a6";

  it("should add a document hash to the registry", async () => {
    const instance = await DocumentRegistry.deployed();

    const added = await instance.add(documentHash, { from: ownerAccount });
    console.log(added);

    const verification = await instance.verify(documentHash);
    assert.notEqual(
      verification.toNumber(),
      0,
      "The document should be verified in the registry"
    );
  });

  it("should return the correct date for the document", async () => {
    const instance = await DocumentRegistry.deployed();

    const verification = await instance.verify(documentHash);

    const dateNumEpoch = verification.toNumber() * 1000; // convert to ms
    const dt = new Date(dateNumEpoch);
    console.log("Date:", dt);
    assert.equal(
      dt.getFullYear(),
      new Date().getFullYear(),
      "The document should be added in the correct year"
    );
  });

  it("should verify ownership", async () => {
    const instance = await DocumentRegistry.deployed();
    const owner = await instance.owner();
    console.log("Current owner:", owner);
    assert.equal(owner, ownerAccount, "The owner should be the first account");
  });

  it("should prevent non-owners from adding a document", async () => {
    const instance = await DocumentRegistry.deployed();

    try {
      await instance.add(documentHash, { from: nonOwnerAccount });
      assert.fail("The transaction should have thrown an error");
    } catch (error) {
      assert(
        error.message.includes("Ownership Assertion"),
        "Expected an ownership error but got a different error"
      );
    }
  });

  it("should transfer ownership and allow the new owner to add a document", async () => {
    const instance = await DocumentRegistry.deployed();
    await instance.transferOwnership(nonOwnerAccount, { from: ownerAccount });
    const newOwner = await instance.owner();
    console.log("New owner:", newOwner);
    assert.equal(
      newOwner,
      nonOwnerAccount,
      "The ownership should have been transferred to the second account"
    );

    const addedAsNewOwner = await instance.add(documentHash, {
      from: nonOwnerAccount,
    });
    console.log(addedAsNewOwner);
    assert(addedAsNewOwner, "New owner should be able to add documents");
  });
});
