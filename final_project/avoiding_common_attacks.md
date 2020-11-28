# Avoiding Common Attacks

## Re-Entracy Attacks

All work is done internally before it is sent externally

## Denial of Service with Failed Call

A `sketch_Exists` boolean mapping to record when a sketch is issued prevents a revert if a sketch with the same hash is ever minted in the future
