pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title A contract to upload sketch's and transfer sketch's on ipfs for designers to collaborate 
/// @author Simon Palmer
/// @notice This contract inherits from the ERC721 standard
/// @dev All function calls are currenlty implemented without side effects
contract Sketch is ERC721{
  string[] public sketchs;
  mapping(string => bool) _sketchExists;

  constructor() ERC721("Sketch", "SKETCH") public {
  }

  /// @notice mints the ipfs hash passed from the console
  /// @dev example input for _sketch is an ipfs hash ("QmdMuGrMCfvgwg7F6WM8CHev9PJxQ2n3f49ttSGuYfK4Qp")
  function mint(string memory _sketch) public {
    require(!_sketchExists[_sketch]);
    sketchs.push(_sketch);
    uint _id = sketchs.length - 1;
    _safeMint(msg.sender, _id,'');
    _sketchExists[_sketch] = true;
  }

  /// @notice transfers the tokenId to contract requested in console
  /// @dev circuit breaker requires _to address to be msg.sender
  function transfersketch(address _to, uint _id) public {
      safeTransferFrom(msg.sender, _to, _id);
  }
}


