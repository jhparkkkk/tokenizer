from web3 import Web3
import json
import os

class ContractDeployer:
    def __init__(self, abi_path, bytecode_path, ganache_url="http://127.0.0.1:7545"):
        self.web3 = Web3(Web3.HTTPProvider(ganache_url))
        if self.web3.is_connected():
            print("Connected to Ganache")
        else:
            raise Exception("Error: Ganache not connected")
        PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))
        deployment_dir = os.path.join(PROJECT_ROOT, "deployment")

        with open(deployment_dir + abi_path, "r") as abi_file:
            self.abi = json.load(abi_file)
        
        with open(deployment_dir + bytecode_path, "r") as bytecode_file:
            self.bytecode = bytecode_file.read()

        self.account = self.web3.eth.accounts[0]

    def deploy(self, initial_supply):
        """Déployer le contrat avec une supply initiale"""
        Toto42 = self.web3.eth.contract(abi=self.abi, bytecode=self.bytecode)

