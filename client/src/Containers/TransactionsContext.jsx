import React from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../Utils/constants";

export const TransactionContext = React.createContext();

// access ethereum from window object
const ethereum = window?.ethereum;

//function to fetch ethereum cotnract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // fetch contract
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = React.useState([]);
  const [allTransactions, setTransactions] = React.useState([]);
  const [sendingAmount, setSendingAmount] = React.useState(false);
  const [transactionCount, setTransactionCount] = React.useState(
    localStorage.getItem("transactionCount") || 0
  );

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      // eth_accounts: check for ethereum accounts
      const accounts = await ethereum.request({method: "eth_accounts"});
      if (accounts.length === 0) {
        return alert("No accounts found");
      } else {
        setCurrentAccount(accounts[0]);
        //get all transactions
        getAllTransactions();
      }
      console.log("accounts", accounts);
    } catch (error) {
      throw new Error("no ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      // eth_requestAccounts: check for ethereum request accounts
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      if (accounts?.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      throw new Error("no ethereum object");
    }
  };

  const sendTransactions = async (values) => {
    try {
      setSendingAmount(true);
      if (!ethereum) return alert("Please install metamask");
      // get data from the form
      console.log(values);

      const transactionContract = getEthereumContract();

      // convert the amount
      const parsedAmount = ethers.utils.parseEther(values.amount.toString());

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: values.addressTo,
            gas: "0x5208", //hexadecimal value 21000 GWEI
            value: parsedAmount._hex, // convert it into
          },
        ],
      });

      const transcationHash = await transactionContract.addToBlockChain(
        values.addressTo,
        parsedAmount,
        values.message,
        values.keyword
      );

      // wait for transaction to finish
      await transcationHash.wait();
      console.log("success", transcationHash.hash);
      console.log("transactionContract", transactionContract);

      // set transaction count

      const transactionCounts =
        await transactionContract.getTransactionsCount();
      localStorage.setItem("transactionCount", transactionCounts.toNumber());
      setTransactionCount(transactionCounts.toNumber());
    } catch (error) {
      alert("failed to send transaction");
      console.log(error);
      throw new Error("no ethereum object");
    } finally {
      setSendingAmount(false);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      const transactionContract = getEthereumContract();

      const transactionCounts =
        await transactionContract.getTransactionsCount();
      localStorage.setItem("transactionCount", transactionCounts) || 0;
    } catch (error) {
      alert("failed to get wallet status");

      throw new Error("no ethereum object");
    }
  };

  React.useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransactions,
        sendingAmount,
        allTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
