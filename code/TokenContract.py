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

    def compile_contract(self):
        """Compile solidity and generate ABI and ByteCodes
        """
        install_solc(self.solidity_version)
        
        with open(self.solidity_file, "r") as file:
            contract_source_code = file.read()


        compiled_sol = compile_standard(
            {
                "language": "Solidity",
                "sources": {"SimpleStorage.sol": {"content": contract_source_code}},
                "settings": {
                    "outputSelection": {
                        "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                    }
                },
            },
            solc_version='0.8.20', base_path=os.path.join(self.PROJECT_ROOT, "node_modules")
        )
        print(compiled_sol) 