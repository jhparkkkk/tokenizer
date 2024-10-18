import json
from solcx import compile_standard, install_solc, compile_files
import os


class TokenContract:
    PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))

    solidity_version = '0.8.20'
    def __init__(self, solidity_file: str):
        print(solidity_file)
        self.solidity_file = solidity_file
        self.compile_contract()
        pass

    def get_abi(self):
        return self.abi
    
    def get_bytecode(self):
        return self.bytecode

    def compile_contract(self):
        """Compile solidity and generate ABI and ByteCodes
        """
        install_solc(self.solidity_version)
        
        with open(self.solidity_file, "r") as file:
            contract_source_code = file.read()

        print(os.path.basename(self.solidity_file))
        compiled_sol = compile_standard(
            {
                "language": "Solidity",
                "sources": {os.path.basename(self.solidity_file): {"content": contract_source_code}},
                "settings": {
                    "outputSelection": {
                        "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                    }
                },
            },
            solc_version=self.solidity_version, base_path=os.path.join(self.PROJECT_ROOT, "node_modules")
        )


        deployment_dir = os.path.join(self.PROJECT_ROOT, "deployment")

        compiled_contract_file = os.path.join(deployment_dir, "compiled_Toto42.json")
        with open(compiled_contract_file, "w") as file:
            json.dump(compiled_sol, file)

        contract_data = compiled_sol['contracts'][os.path.basename(self.solidity_file)]
        self.abi = contract_data['Toto42']['abi']
        self.bytecode = contract_data['Toto42']['evm']['bytecode']['object']

        abi_file = os.path.join(deployment_dir, "Toto42_abi.json")
        bytecode_file = os.path.join(deployment_dir, "Toto42_bytecode.json")

        with open(abi_file, "w") as file:
            json.dump(self.abi, file)

        with open(bytecode_file, "w") as file:
            file.write(self.bytecode)
    