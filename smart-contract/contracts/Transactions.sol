// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Transactions {
    uint256 transactionsCount;
    event Transfer(
        address sender,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // properties of object and its type
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockChain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        // increment transactions count
        transactionsCount += 1;

        // store the transactions that come through the contract
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // transfer the amount
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionsCount;
    }
}
