import React from "react";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Main = () => {
  const { connectWallet, sendTransaction, handleChange, inputFormData } =
    useContext(TransactionContext);
  const handleSumbit = () => {
    const { addressTo, amount } = inputFormData;
    if (addressTo == "" || amount == "") {
      return;
    } else {
      sendTransaction();
    }
  };
  return (
    <div className="mainContainer">
      {/* 左側 */}
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>
        <button type="button">
          <p className="buttonText" onClick={connectWallet}>
            ウォレット連携
          </p>
        </button>
      </div>
      {/* 右側 */}
      <div className="inputContainer">
        <input
          type="text"
          placeholder="アドレス"
          name="addressTo"
          onChange={(e) => handleChange(e, "addressTo")} //変更した時
        />
        <input
          type="number"
          placeholder="通貨"
          name="amount"
          step="0.0001"
          onChange={(e) => handleChange(e, "amount")}
        />
        <button type="button" onClick={handleSumbit}>
          送信
        </button>
      </div>
    </div>
  );
};

export default Main;
