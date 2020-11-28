# Design Pattern Decisions

## Circuit Breaker

1. Circuit Breaker halts contract if minting or transfering is not performed by authorized address (i.e. `msg.sender`)
2. To prevent the same hash being applied twice a `require` function is used to throw an exception if a ipfs hash already exists
	`require(!_sketchExists[_sketch])`
3. Used my own custom mapped string for ipfs address's. In the future I would use `base.URI` and set it to ipfs:// and then create `token.URI` for the hash address to be stored given I am using the ERC721 standard
4. `Transfersketch` function use ERC721's `safeTransferFrom` function which safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked.
4. Have used a `selfdestruct` function to use when administration wants to destroy the contract

