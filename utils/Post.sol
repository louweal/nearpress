//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Post {
    address public operator;
    string[] public pages; //getter: pages(i)
    uint256 public pageId; 


    constructor() {
        operator = msg.sender;
    }


    function addPage(string memory content) public onlyOperator() returns (bool success) {
        pages.push(content);
        emit NewPage(pageId++);
        return true;
    }

    // modifiers
    modifier onlyOperator() {
        require(operator == msg.sender, "Only the operator can call this function");
        _;
    }

    //events 

    event NewPage(uint256 indexed pageId);


}
