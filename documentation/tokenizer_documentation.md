### My project: create and deploy an ERC-20 token on the Ethereum blockchain using Truffle and Sepolia Testnet.


$Toto42 is a basic ERC-20 token with basic functionalities link transferring, minting and burning.

Name: Toto42
Symbol: $Toto42
Total Supply: can be minted by the owner
Smart Contract Standard: ERC-20

Technologies I choosed:
- Blockchain: Ethereum (Sepolia Testnet)
- Smart Contract Language: Solidity
- Development framework: Truffle
- Local Blockchain Simulator: Ganache
- Javascript runtime: Node.js
- Wallet: MetaMask
- Blockchain RPC: Alchemy (to connect to Sepolia network)


Project Setup

#### Alchemy
the url provided by Alchemy acts a remote node endpoint enabling to connect to the blockchain


#### truffle-config.js
The configuration file for Truffle. Configured 2 networks:
1) *development*: a local blockchain network used for testing and development.
2) *sepolia*: configuration for deploying contracts to the Sepolia Testnet. I use HDWalletProvider to connect to an Ethereum node via Alchemy and deploy using the mnemonic.

#### /code
where .sol files are located.

#### /deployment
whew migration files are located.


### How to create TOTO42 tokens
mint() method is used to add tokens on my smart contract.
step 1: create contract instance
step 2: retrieve contract owner address
step 3: execute mint() method that takes 2 aguments: the destination (the owner) and the amount of tokens that has been converted in wei
step 4: check total supply

```
npx truffle console --network sepolia
let instance = await Toto42.deployed();
let owner = await instance.owner();
let amountToMint = web3.utils.toWei("100", "ether");
await instance.mint(owner, amountToMint, { from: owner });

```

### Conversion in wei
In ERC-20 tokens, decimals are the smallest unit my token can be divided into, meaning 1 token can be represented by 10^18 smaller units. The conversion allows the smart contract with integers enuring its accuracy.

### ERC-20 standard methods
```
function totalSupply() public view returns (uint256)
```
return total numbers of tokens
```

function balanceOf(address _owner) public view returns (uint256 balance)
```


 get the balance of tokens owned by an address
```
function transfer(address _to, uint256 _value) public returns (bool success)
```
transfers amount of tokens to address and must fire the Transfer event. If the caller's account balance does not have enough tokens then an error is thrown.


```
function mint(address to, uint256 amount)

```
create tokens

```
function brun(address to, uint256 amount)

```
destroy tokens


### document registry
hashed documents are registered in the blockchain. This way only the owner of the contract is allowed to add documents to the register.
- inherits from the contracts *Ownable* : handles ownership  rules of a contract



