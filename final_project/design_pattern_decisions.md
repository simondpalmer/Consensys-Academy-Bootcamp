# Design Pattern Decisions

## Circuit Breaker

1. Circuit Breaker halts contract if minting or transfering is not performed by authorized address (i.e. `msg.sender`)
2. To prevent the same hash being applied twice a `require` function is used to throw an exception if a ipfs hash already exists
	`require(!_sketchExists[_sketch])`
3. Used my own mapped string for address. In future I would use `base.URI` and set it to ipfs:// and then create `token.URI` for the hash address
	
1. What other design patterns have you used / not used?
2. Why did you choose the patterns that you did?
3. Why not others?
