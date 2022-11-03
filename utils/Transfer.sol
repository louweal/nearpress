//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Transfer {
    function payWriter(address payable writer) external payable {
        writer.transfer(msg.value);
    }
}
