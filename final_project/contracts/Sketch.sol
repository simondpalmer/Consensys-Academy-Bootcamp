pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Sketch is ERC721 {
  string[] public sketchs;
  mapping(string => bool) _sketchExists;

  constructor() ERC721("Sketch", "SKETCH") public {
  }

  // E.G. color = "#FFFFFF"
  function mint(string memory _sketch) public {
    require(!_sketchExists[_sketch]);
    sketchs.push(_sketch);
    uint _id = sketchs.length - 1;
    _mint(msg.sender, _id);
    _sketchExists[_sketch] = true;
  }
}


