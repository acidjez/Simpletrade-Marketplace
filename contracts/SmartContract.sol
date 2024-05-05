// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";

contract SimpleTrade is Owned {
    
    struct Transaction {
        string title;
        string price;
        string date;
    }
        struct Customer {
        string name;
        string addr;
        string email;
    }

    mapping(address => bool) public customers;
    mapping(address => Transaction[]) public transactions;
    mapping(address => Customer) public customerDetails;



    function addTransaction(string memory title, string memory price, string memory date, string memory name, string memory addr, string memory email) external payable{
    address customer = msg.sender;
      
    if (!customers[customer]) {          
        customers[customer] = true;
        customerDetails[customer] = Customer(name, addr, email);            
    }
    else {
        if (bytes(name).length > 1){customerDetails[customer].name = name;}
        if (bytes(addr).length > 12) {customerDetails[customer].addr = addr;}
        if (bytes(email).length > 0) {customerDetails[customer].email = email;}
    }
    transactions[customer].push (Transaction(title, price, date));      
    }
   
    function getTransactions(address customer) external view returns (Transaction[] memory) {
        return transactions[customer];
    }

    function getCustomer(address customer) external view returns (Customer memory) {
        return customerDetails[customer];
    }

    function withdraw(uint withdrawAmount) external onlyOwner(){
        require(
            withdrawAmount <= address(this).balance,
            "Insufficient balance in Smart Contract"
        );
        payable(msg.sender).transfer(withdrawAmount);
    }
} 
