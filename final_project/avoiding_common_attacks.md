# Avoiding Common Attacks

## Denial of Service with Failed Call

A `sketch_Exists` boolean mapping to record when a sketch is issued prevents a revert if a sketch with the same hash is ever minted in the future. By using `mapping(string => bool) _sketchExists` we can add `_sketchExists[_sketch] = true` after each sketch is added. 
For each sketch to be added we check this boolean value within the mint function `require(!_sketchExists[_sketch])` before each subsequent sketch upload
