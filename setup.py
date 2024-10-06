import os
import subprocess
import sys

venv_dir = "web3-env"

if not os.path.exists(venv_dir):
    subprocess.run([sys.executable, "-m", "venv", venv_dir])


activate_script = os.path.join(venv_dir, "bin", "activate")
bash_command = f"/bin/bash -c 'source {activate_script} && {venv_dir}/bin/pip install --upgrade pip && {venv_dir}/bin/pip install -r requirements.txt'"
subprocess.run(bash_command, shell=True)
