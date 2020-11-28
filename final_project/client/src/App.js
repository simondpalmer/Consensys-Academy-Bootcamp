import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import ipfs from './ipfs'
import Sketch from './contracts/Sketch.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async refreshPage(){
    window.location.reload();
  }
  async refreshAccount(){
    window.ethereum.on("accountChanged", function (accounts){
      this.setState({account: accounts[0]})
    })
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Sketch.networks[networkId]
    console.log(networkData)
    if(networkData) {
      const abi = Sketch.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      const accountSupply = await contract.methods.balanceOf(accounts[0]).call()
      this.setState({ accountSupply })
      console.log({ accountSupply })
      console.log({ totalSupply })     
      // Load Sketchs
      for (var i = 1; i <= totalSupply; i++) {
        const sketch = await contract.methods.sketchs(i - 1).call()
        this.setState({
          sketchs: [...this.state.sketchs, sketch]
        })
      }
      console.log( this.state.sketchs ) 
      for (var i = 0; i < accountSupply; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        this.setState({
          accsketchIDs: [...this.state.accsketchIDs, tokenId]
        })
      }
      console.log( this.state.accsketchIDs )
      const accsketchs = this.state.accsketchIDs.map(i => this.state.sketchs[i])
      this.setState({ accsketchs })
      console.log( this.state.accsketchs )
    }
    else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  mint = (sketch) => {
    this.state.contract.methods.mint(sketch).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        sketchs: [...this.state.sketchs, sketch]
      })
    })
  }
  transfer = (tokenID, toAccount) => {
    this.state.contract.methods.transfersketch(toAccount, tokenID).send({ from: this.state.account })
    .once('receipt', (receipt) => { this.refreshPage() })
  }


  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      buffer: null,
      contract: null,
      tokenID: 0,
      toAccount: null,
      accountSupply: 0,
      totalSupply: 0,
      sketchs: [],
      accsketchs: [],
      accsketchIDs: []
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    // Process file for IPFS...
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result)})
    }
  }

  //QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n
  // Example url: https://ipfs.infura.io/ipfs/QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n
  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting the sketch...")
    ipfs.files.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const sketch = result[0].hash
      this.mint(sketch)
      if(error)
        console.error(error)
        return
    })
  }
  handleIDInput = event => {
    this.setState({ tokenID: event.target.value})
  }
  handleContractInput = event => {
    this.setState({ toAccount: event.target.value})
  }

  onTransfer = (event) =>{
    event.preventDefault()
    console.log("Transfering the sketch...")
    const token = this.state.tokenID
    const toAccount = this.state.toAccount
    this.transfer(token,toAccount)
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer">
            Design Co-Lab
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="totalSupply">{"Total number of sketch's: " + this.state.totalSupply}</span></small>
            </li>
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{'Current user: ' + this.state.account}</span></small>
            </li>
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="accountSupply">{"Number of sketch's owned by current user: " + this.state.accountSupply}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto mt-5">
                <h2>Upload Sketch</h2>
                <form onSubmit={this.onSubmit}>                  
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit'
                  ref={(input) => { this.sketch = input }}/>
                </form>
                <h2>Transfer Sketch</h2>
                  <button onClick={this.onTransfer}>Transfer</button>
                  <input onChange={this.handleIDInput} placeholder="Enter tokenId"/>
                  <input onChange={this.handleContractInput} placeholder="Enter address"/>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.accsketchs.map((sketch, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token"> 
                    <img src={ 'https://ipfs.infura.io/ipfs/' + sketch }></img>
                  </div>
                  <div className ="mr-auto ml-auto row mt-5"><h6>{"ipfs hash: " + sketch}</h6>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;