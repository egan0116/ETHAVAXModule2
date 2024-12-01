import { useState, useEffect } from "react";
import { ethers } from "ethers";
import catFeederABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [catFeeder, setCatFeeder] = useState(undefined);
  const [foodSupply, setFoodSupply] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your deployed contract address
  const catFeederContractABI = catFeederABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      setAccount(account[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("Please install MetaMask to use CatFeeder!");
      return;
    }
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    setupCatFeederContract();
  };

  const setupCatFeederContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, catFeederContractABI, signer);
    setCatFeeder(contract);
  };

  const fetchFoodSupply = async () => {
    if (catFeeder) {
      setFoodSupply((await catFeeder.getFoodSupply()).toNumber());
    }
  };

  const addFood = async () => {
    if (catFeeder) {
      let tx = await catFeeder.addFood(1);
      await tx.wait();
      fetchFoodSupply();
    }
  };

  const feedCat = async () => {
    if (catFeeder) {
      let tx = await catFeeder.feedCat(1);
      await tx.wait();
      fetchFoodSupply();
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to CatFeeder!</h1>
      </header>
      {!ethWallet && <p>Please install MetaMask!</p>}
      {!account && (
        <button onClick={connectAccount}>Connect your MetaMask Wallet</button>
      )}
      {account && (
        <div>
          <img
          src="https://pbs.twimg.com/profile_images/1539306046782689284/1rqD3UpB_400x400.jpg"
          alt="User Profile"
          style={{ width: "400px", height: "400px", marginBottom: "20px" }}
          />
          <p>Your Account: {account}</p>
          <p>Available Cat Food Tokens: {foodSupply}</p>
          <button onClick={addFood}>Add 1 Cat Food Token</button>
          <button onClick={feedCat}>Feed 1 Cat Food Token</button>
        </div>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </main>
  );
}
