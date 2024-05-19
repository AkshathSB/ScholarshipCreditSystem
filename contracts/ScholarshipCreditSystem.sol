// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ScholarshipCreditSystem {
    enum ExpenseType { Tuition, Food, Trip }  // Using enum for expense types

    mapping(address => uint256) public balances;
    mapping(address => bool) public hasCredits;

    uint256 constant minCreditsToPayTuition = 500;
    uint256 constant minCreditsToPayFood = 200;
    uint256 constant minCreditsToPayTrip = 300;

    event CreditsAwarded(address indexed student, uint256 amount);
    event CreditsUsed(address indexed student, ExpenseType purpose, uint256 amount);

    function awardCredits(uint256 subject1Grade, uint256 subject2Grade, uint256 subject3Grade) external {
        require(subject1Grade <= 100 && subject2Grade <= 100 && subject3Grade <= 100, "Grades must be between 0 and 100.");

        uint256 totalCredits = 0;

        totalCredits += calculateCredits(subject1Grade);
        totalCredits += calculateCredits(subject2Grade);
        totalCredits += calculateCredits(subject3Grade);

        balances[msg.sender] += totalCredits;
        hasCredits[msg.sender] = true;
        emit CreditsAwarded(msg.sender, totalCredits);
    }

    function calculateCredits(uint256 grade) private pure returns (uint256 credits) {
        if (grade >= 90) return 200;
        if (grade >= 80) return 100;
        if (grade >= 70) return 80;
        return 0;
    }

    function checkBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function useCredits(ExpenseType purpose, uint256 amount) external {
        require(hasCredits[msg.sender], "No credits available for use.");
        require(balances[msg.sender] >= amount, "Insufficient balance to complete this transaction.");

        uint256 minRequired = getMinimumCreditsRequired(purpose);
        require(amount >= minRequired, "Insufficient credits for the selected purpose.");

        balances[msg.sender] -= amount;
        emit CreditsUsed(msg.sender, purpose, amount);
    }

    function getMinimumCreditsRequired(ExpenseType purpose) private pure returns (uint256) {
        if (purpose == ExpenseType.Tuition) return minCreditsToPayTuition;
        if (purpose == ExpenseType.Food) return minCreditsToPayFood;
        if (purpose == ExpenseType.Trip) return minCreditsToPayTrip;
        revert("Invalid purpose for credit use.");
    }
}
