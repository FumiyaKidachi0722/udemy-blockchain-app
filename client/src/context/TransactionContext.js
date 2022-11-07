import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";

export const TransactionContext = createContext();

const { ethereum } = window;

//スマートコントラウトを取得
const getSmartContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(provider, signer, transactionContract);

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [inputFormData, setInputFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const handleChange = (e, name) => {
    //react
    setInputFormData((prevInputFormData) => ({
      ...prevInputFormData,
      [name]: e.target.value, //フォームに値が入っているときに更新される
    }));
  };

  //メタマスク連携確認（リロード毎）
  const checkMetaMadkWalletConnected = async () => {
    if (!ethereum) return alert("Please installed MetaMask!");

    //メタマスクのアカウントID取得
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  };

  //メタマスクと連携
  const connectWallet = async () => {
    if (!ethereum) return alert("Please installed MetaMask!");

    //メタマスクを持っていれば接続
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts[0]);
    setCurrentAccount(accounts[0]);
  };

  //通貨取引
  const sendTransaction = async () => {
    if (!ethereum) return alert("Please installed MetaMask!");
    console.log("sendTransaction");
    const { addressTo, amount } = inputFormData;

    const transactionContract = getSmartContract();
    const parsedAmount = ethers.utils.parseEther(amount);
    console.log(addressTo);
    console.log(currentAccount);

    const transactionParameters = {
      gas: "0x2710",
      to: addressTo,
      from: currentAccount,
      value: parsedAmount._hex,
    };
    console.log("1");

    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    const transactionHash = await transactionContract.addToBlockChain(
      addressTo,
      parsedAmount
    );
    console.log(`ロード中・・・${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`送金に成功！${transactionHash.hash}`);
  };

  useEffect(() => {
    checkMetaMadkWalletConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ connectWallet, sendTransaction, handleChange, inputFormData }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
