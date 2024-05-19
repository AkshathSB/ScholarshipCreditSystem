import {useState, useEffect} from "react";
import {ethers} from "ethers";
import scholarshipContractABI from "../artifacts/contracts/ScholarshipCreditSystem.sol/ScholarshipCreditSystem.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [scholarshipContract, setScholarshipContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [grades, setGrades] = useState({ subject1: 0, subject2: 0, subject3: 0 });

  const contractAddress = "0x1300b14ea708daA68D7Bf70ede648253e40e5216"; // Replace with your actual contract address
  const scholarshipABI = scholarshipContractABI.abi;

  useEffect(() => {
    const getWallet = async () => {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
      }
    };

    getWallet();
  }, []);

  const handleAccount = async (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    getScholarshipContract();
  };

  const getScholarshipContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, scholarshipABI, signer);
    setScholarshipContract(contract);
  };

  const getBalance = async () => {
    if (scholarshipContract) {
      const balance = await scholarshipContract.checkBalance();
      setBalance(balance.toString());
    }
  };

  const awardCredits = async () => {
    if (scholarshipContract) {
      const { subject1, subject2, subject3 } = grades;
      let tx = await scholarshipContract.awardCredits(subject1, subject2, subject3);
      await tx.wait();
      getBalance();  // Update balance after awarding credits
    }
  };

  const useCredits = async (expenseType, amount) => {
    if (!scholarshipContract) {
      console.log("Contract not connected or not available.");
      return;
    }
    
    try {
      // Call the useCredits function from the contract
      let tx = await scholarshipContract.useCredits(expenseType, amount);
      await tx.wait();
      console.log(`Credits used for ${expenseType}: ${amount}`);
      getBalance();  // Update the balance after using credits
    } catch (error) {
      console.error('Error using credits:', error);
      alert('Failed to use credits. Check console for details.');
    }
  };
  

  const handleGradeChange = (subject, value) => {
    setGrades(prevGrades => ({ ...prevGrades, [subject]: value }));
  };

  const renderUserInterface = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to interact with this system.</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect your MetaMask wallet</button>;
    }

    return (
      <div>
        <h1>Scholarship Credit System</h1>
        <p>Account: {account}</p>
        <p>Balance: {balance}</p>
        <div>
          <input type="number" value={grades.subject1} onChange={e => handleGradeChange('subject1', parseInt(e.target.value))} />
          <input type="number" value={grades.subject2} onChange={e => handleGradeChange('subject2', parseInt(e.target.value))} />
          <input type="number" value={grades.subject3} onChange={e => handleGradeChange('subject3', parseInt(e.target.value))} />
          <button onClick={awardCredits}>Award Credits</button>
        </div>
        <button onClick={() => useCredits(0, 500)}>Use Credits for Tuition</button>
        <button onClick={() => useCredits(1, 200)}>Use Credits for Food</button>
        <button onClick={() => useCredits(2, 300)}>Use Credits for Trip</button>
      </div>
    );
  };

  return (
    <main className="container">
      {renderUserInterface()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: black;
          color: white;
          border: 20px solid grey;
        }
        button {
          background-image: linear-gradient(to right, #4caf50, #5C67F2); 
          border: none; 
          color: white;
          padding: 10px 20px; 
          font-size: 16px;
          font-weight: bold; 
          border-radius: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
          transition: all 0.3s ease; 
          cursor: pointer; 
        }
      
        button:hover {
          background-image: linear-gradient(to right, #5C67F2, #4caf50); 
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); 
          transform: translateY(-2px); 
        }
      
        button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); 
        }
      
        input[type="number"] {
          background-color: #222; 
          color: white; 
          border: 1px solid #444; 
          padding: 10px; 
          border-radius: 5px; 
          margin: 0 5px 10px 5px; 
          width: calc(33% - 14px); 
        }
        
      `}</style>
    </main>
  )
}
