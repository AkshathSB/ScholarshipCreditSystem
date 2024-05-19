# Scholarship Credit System

This project implements a blockchain-based Scholarship Credit System using Ethereum smart contracts. It includes a front-end application that interacts with the smart contracts to manage and award scholarship credits based on academic performance.

## Description

The Scholarship Credit System utilizes smart contracts to allocate, manage, and utilize credits for scholarship holders. Students can earn credits based on their grades and use these credits for various educational expenses like tuition, food, and trips. The front-end provides an interactive interface for students to view their balance, award credits based on academic achievements, and use credits for specified expenses.

### Key Features:

- **Award Credits**: Automatically calculate and award credits based on student grades.
- **Use Credits**: Allow students to use their awarded credits towards tuition, food, or trip expenses.
- **Check Balance**: Students can check their current credit balance through the front-end interface.

## Technical Stack

- **Ethereum Blockchain**: The backend logic is handled through Ethereum smart contracts.
- **Solidity**: Smart contracts are written in Solidity.
- **React**: The front-end is developed using React.
- **Ethers.js**: Library used to interact with Ethereum nodes from the web application.

## Installation

To set up and run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

```cd <project-directory>
   npm install
```

3. Deploy the smart contract:

```
npx hardhat run scripts/deploy.js
```

4. Start the front-end server:

```
npm run dev
```

5. Ensure you have MetaMask installed in your browser to interact with the Ethereum network

## Authors

Akshath - akshathbhandiwad2@gmail.com

## License

This project is licensed under the MIT License
