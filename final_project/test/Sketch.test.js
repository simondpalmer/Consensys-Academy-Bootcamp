
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
            // Success
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0 , 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')
      
            // Failure: cannot mint same sketch twice
            await contract.mint('QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n').should.be.rejected;
          })
        })
    describe('indexing', async () => {
        it('lists sketchs', async () => {
            // Mint 3 more sketchs
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
    describe('transfers', async () => {
        it('transfers sketch', async () => {
            //transfer a sketch
            const result = await contract.transfersketch(accounts[2], 1)
            expect(await contract.ownerOf(1)).to.equal(accounts[2])
            
            const accBalance02 = await contract.balanceOf(accounts[0])
            const totalSupply = await contract.totalSupply()
            let tokenId
            let tokens = []

            let sketch
            let allsketchs = []
            //retrieve list of total sketchs
            for (var i = 1; i <= totalSupply; i++) {
                sketch = await contract.sketchs(i - 1)
                allsketchs.push(sketch)

            }
            //retrieve all tokens owned by user
            for (var i = 0; i < accBalance02; i++) {
                tokenId = await contract.tokenOfOwnerByIndex(accounts[0], i)
                tokens.push(tokenId.toNumber())
            }
            //get list of sketchs
            const intersection = tokens.map(i => allsketchs[i])
            let expected = ['QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw552n', 'QmdMuGrMCfvgwg7F6WM8CHev9PJxQ2n3f49ttSGuYfK4Qp', 'QmZxz8piv6QcYWHVgr4UBGeoT4Q4nTzWTNx5AAGaT5rF4U']
            assert.equal(intersection.join(','), expected.join(','))
            
        })
        it('creates another new sketch token', async () => {
            const result = await contract.mint('QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw662n')
            const totalSupply = await contract.totalSupply()
            // Success
            assert.equal(totalSupply, 5)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 4 , 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')
      
            // Failure: cannot mint same sketch twice
            await contract.mint('QmU5eQ66pWzCAKGCWwRdM33nXK99aX9k9rYRGGhmAw662n').should.be.rejected;
          })
    })
})