
const Sketch = artifacts.require('./Sketch.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Sketch', (accounts) => {
    let contract

    before(async () => {
        contract = await Sketch.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Sketch')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'SKETCH')
        })
    })

    describe('minting', async () => {
        it('creates a new sketch token', async () => {
            const result = await contract.mint('QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n')
            const totalSupply = await contract.totalSupply()
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0 , 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')
      
            // FAILURE: cannot mint same color twice
            await contract.mint('QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n').should.be.rejected;
          })
        })
    describe('indexing', async () => {
        it('lists colors', async () => {
            // Mint 3 more tokens
            await contract.mint('QmZ7pbi8hw7DMfNsH5LPSZbQPYrrs38VCt6kSxY5UG2we2')
            await contract.mint('QmZxz8piv6QcYWHVgr4UBGeoT4Q4nTzWTNx5AAGaT5rF4U')
            await contract.mint('QmdMuGrMCfvgwg7F6WM8CHev9PJxQ2n3f49ttSGuYfK4Qp')
            const totalSupply = await contract.totalSupply()
        
            let sketch
            let result = []
        
            for (var i = 1; i <= totalSupply; i++) {
            sketch = await contract.sketchs(i - 1)
            result.push(sketch)
            }
        
            let expected = ['QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n', 'QmZ7pbi8hw7DMfNsH5LPSZbQPYrrs38VCt6kSxY5UG2we2', 'QmZxz8piv6QcYWHVgr4UBGeoT4Q4nTzWTNx5AAGaT5rF4U', 'QmdMuGrMCfvgwg7F6WM8CHev9PJxQ2n3f49ttSGuYfK4Qp']
            assert.equal(result.join(','), expected.join(','))
        })
    })
})