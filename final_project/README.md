# Design Co-Lab Dapp
A Dapp that allows architects and designers alike to upload sketch's onto a design collaboration platform powered by ipfs, a peer-to-peer network for storing and sharing data. These are tokenized in the process onto the blockchain so to record the transfer of value between designers and potentially reward them in the process with Eth.
Dependant on the user the Dapp shows all of the sketchs that have been uploaded by that user. 

Watch the [demo](https://drive.google.com/file/d/1h4yIzMi5Uli09VaN3LobPHmqFQmqB-ut/view) for more information

## Environment Setup

**The project is developed using different technologies**

- node.js
- React
- solidity
- ganache-cli
- metamask
- truffle
- IPFS

**Dependancies**

- node v10.19
- truffle v5.1.5
- Solidity ^0.6.0
- Ganache-cli
- Chrome
- MetaMask

## To Deploy

1. Clone git repo into a local directory
2. Run `ganache-cli`
3. In a seperate terminal go to `finalproject` directory
4. Run `truffle migrate --network development --reset` to migrate the contract onto truffle
5. Open Chrome and if you haven't already done so, create a custom RPC network on MetaMask and point it to `http://localhost:8545` 
6. In a seperate terminal go to `finalproject/client`
7. Run `npm start` to start the application
8. Chrome browser will open on `http://localhost:3000/` with MetaMask requesting you to log-in with your password
9. Happy collaborating!

## Use Cases

1. **Designer uploads a sketch**

- under "Upload Sketch"
- choose the file you wish to upload (e.g. jpeg file)
- click submit
- file is uploaded and displayed below along with the other shetch's associated with the current address

2. **Designer wants to transfer a sketch**

- input the tokenID number of the uploaded sketch
- input the contract address to transfer the sketch to
- click Transfer
- sketch is removed from list of sketchs below
- sketch is now accessible by recipient address 

3. **Designer wants to check number of overall sketch's**

- number of overall sketch's shown in navigation bar

4. **Designer wants to check number of their own sketch's**

- number of designers sketch's shown in navigation bar

## Tests
Tests include:

* Successful deployment
* It has a name
* It has a symbol
* Creating new sketch tokens
* Listing all sketch's
* transfer sketch's to another designer