// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Patents is ERC721URIStorage {
    // Counter to track the tokenID
    using Counters for Counters.Counter;
    Counters.Counter public tokenIds;

    // Owner of the contract
    address owner;

    /*
    Mapping from the patentID to it's status
    0 ====> Pending
    1 ====> Accepted
    2 ====> Rejected
    */
    mapping(uint => uint) public status;
    /*
    Mapping from addresses to their permissions
    true ===> Reviewer
    false ===> Isn't a reviewer
    */
    mapping(address => bool) public isReviewer;
    

    modifier onlyOwner {
        require(msg.sender == owner,"Sender not authorized");
        _;
   }
    modifier onlyReviewer {
        require(isReviewer[msg.sender],"Sender is not a reviewer");
        _;
   }

    constructor() ERC721("PatentItem", "PTM") {
        owner = msg.sender;
        isReviewer[owner] = true;
    }

    function submitPatent(string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        status[newItemId] = 0;

        tokenIds.increment();
        return newItemId;
    }

    function grantReviewPermission(address newReviewer)
    public
    onlyOwner
    {
        isReviewer[newReviewer] = true;
    }

    function reviewPatent(uint256 patentId, bool decision)
    public
    onlyReviewer {
        if (decision == true){
            status[patentId] = 1;
        }
        else {
            status[patentId] = 2;
        }
    }
    function patentStatus(uint256 patentId)
    public
    view
    returns (uint256)
    {
        return status[patentId];
    }
    function isUserReviewer(address addr)
    public
    view
    returns (bool)
    {
        return isReviewer[addr];
    }
}