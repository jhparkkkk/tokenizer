from ContractDeployer import ContractDeployer

if __name__ == "__main__":
    abi_path = "/Toto42_abi.json"
    bytecode_path = "/Toto42_bytecode.json"

    deployer = ContractDeployer(abi_path, bytecode_path)

    contract_address = deployer.deploy(1000)

    print(f"Contrat déployé à l'adresse : {contract_address}")
