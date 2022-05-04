import React from "react";
import {AiFillPlayCircle} from "react-icons/ai";
import {SiEthereum} from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

import {TransactionContext} from "../Containers/TransactionsContext";
import {Loader} from "./";
import {shortenAddress} from "../Utils/shorten-address";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white";

const Input = ({placeholder, name, type, value, handleChange}) => (
  <Field
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    name={name}
    value={value}
    step="0.0001"
    className=" bg-[#2952e3] my-2 w-full rounded-sm p-2 outline-none text-sm text-white border-none white-glassmorphosim"
  />
);

const SignupSchema = Yup.object().shape({
  addressTo: Yup.string().required("Recepient address is required"),
  amount: Yup.string().required("Amount to send is required"),
  keyword: Yup.string().required("Keyword address is required"),
  message: Yup.string().required("Message address is required"),
});

const Welcome = () => {
  const {connectWallet, currentAccount, sendingAmount, sendTransactions} =
    React.useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12">
            Explore crypto world, buy and sell cryptocurrencies easily on crypto
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row  justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className=" grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`${commonStyles}`}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount) || "Address"}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              addressTo: "",
              amount: "",
              keyword: "",
              message: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              sendTransactions(values);
            }}
          >
            {({errors, touched, handleChange, handleSubmit}) => (
              <Form>
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                  <Input
                    placeholder="Address To"
                    name="addressTo"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.addressTo && touched.addressTo ? (
                    <div className="text-red-500 font-semibold text-sm mt-1">
                      {errors.addressTo}
                    </div>
                  ) : null}
                  <Input
                    placeholder="Amount (ETH)"
                    name="amount"
                    type="number"
                    handleChange={handleChange}
                  />
                  {errors.amount && touched.amount ? (
                    <div className="text-red-500 font-semibold text-sm mt-1">
                      {errors.amount}
                    </div>
                  ) : null}
                  <Input
                    placeholder="Keyword (Gif)"
                    name="keyword"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.keyword && touched.keyword ? (
                    <div className="text-red-500 font-semibold text-sm mt-1">
                      {errors.keyword}
                    </div>
                  ) : null}

                  <Input
                    placeholder="Enter message"
                    name="message"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.message && touched.message ? (
                    <div className="text-red-500 font-semibold text-sm mt-1">
                      {errors.message}
                    </div>
                  ) : null}

                  <div className="h-[1px w-full bg-gray-400 my-2]" />
                  {sendingAmount ? (
                    <Loader />
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#3d4f7c]"
                    >
                      Send Now
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
