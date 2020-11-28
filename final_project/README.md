# Design Co-Lab Dapp
A Dapp that allows architects and designers alike to upload designs onto ipfs. These are tokenized in the process onto the blockchain.
Dependant on the user the Dapp shows all of the sketchs that have been uploaded by that user. 

Watch the [demo](https://drive.google.com/file/d/1SdYWBRUrTTq-hxkKLGEO5FujmNhDoUsH/view) for more information

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

## Development Tools

the project is developed using different technologies.

- node.js
- React
- solidity
- ganache-cli
- metamask
- truffle
- IPFS

## Tests
Tests include:

* Successful deployment
* It has a name
* It has a symbol
* Creating new sketch tokens
* Listing all sketch's
* transfer sketch's