# Design Pattern Decisions

## Circuit Breaker

1. Circuit Breaker halts contract if minting or transfering is not performed by authorized address (i.e. `msg.sender`)
2. To prevent the same hash being applied twice a `require` function is used to throw an exception if a ipfs hash already exists
	`require(!_sketchExists[_sketch])`
3. `Transfersketch` function uses ERC721's `safeTransferFrom` function which safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked.
`function safeTransferFrom(address from, address to, uint256 tokenId) external;`

## Restricting Access

1. Have used a `selfdestruct` function to use when administration wants to destroy the contract. Currently updating this to use ERC721's Ownable.sol contract function modifier `onlyOwner()`

## Pattern Decisions

1. Used my own custom mapped string for ipfs address's. In the future I would use `base.URI` and set it to ipfs:// and then create `token.URI` for the hash address to be stored given I am using the ERC721 standard

