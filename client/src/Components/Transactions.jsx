import React from "react";
import {TransactionContext} from "../Containers/TransactionsContext";
import useFetch from "../Containers/useFetch";
import {shortenAddress} from "../Utils/shorten-address";
// import dummydata from "../Utils/dummydata";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifToSearch = keyword || "funny";
  const gifUrl = useFetch({keyword: gifToSearch});
  return (
    <div
      className="
      bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl
  "
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            className=""
            target={"_blank"}
            rel="noopener noreferrer"
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>

          <a
            className=""
            target={"_blank"}
            rel="noopener noreferrer"
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount}ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl}
          alt="gif"
          className="w-full h-64 2xl h-96 rounded-medium shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7d8] font-bold">
            {timestamp || "20-20-2020"}
          </p>
        </div>
      </div>
    </div>
  );
};
const Transactions = () => {
  const {currentAccount, allTransactions} =
    React.useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {/* if account connected */}
        {currentAccount ? (
          <h1 className="text-white">Latest transactions</h1>
        ) : (
          <h5 className="text-white">connect account to proceed</h5>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {allTransactions
            ?.map((transaction) => (
              <TransactionCard key={Math.random()} {...transaction} />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
