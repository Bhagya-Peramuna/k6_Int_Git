# #!/bin/bash
# set -ex

# sudo apt-get update
# sudo apt-get install dirmngr --install-recommends
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
# echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
# sudo apt-get update
# sudo apt-get install k6

#!/bin/bash

# Install the necessary dependencies
sudo apt-get update
sudo apt-get install -y unzip

# Download and install K6
wget -q https://github.com/loadimpact/k6/releases/download/v0.34.0/k6-v0.34.0-linux-amd64.zip
unzip k6-v0.34.0-linux-amd64.zip
chmod +x k6-v0.34.0-linux-amd64/k6
sudo mv k6-v0.34.0-linux-amd64/k6 /usr/local/bin/

# Clean up downloaded files
rm -rf k6-v0.34.0-linux-amd64.zip
