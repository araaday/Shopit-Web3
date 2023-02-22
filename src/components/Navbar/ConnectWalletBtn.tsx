import { useCallback, useContext, useEffect } from "react";
import "./ConnectWalletBtn.css";
import { provider } from "../../helpers";
import WalletContext from "../../contexts/WalletContext";
import { Link } from "react-router-dom";
import Blockie from "../Blockie";

export default function ConnectWalletBtn() {
  const [wallet, changeAccounts] = useContext(WalletContext);

  const requestAccounts = useCallback(
    () => provider().send("eth_requestAccounts", []).then(changeAccounts),
    [changeAccounts]
  );

  useEffect(() => {
    requestAccounts();
  }, [requestAccounts]);

  return wallet.account ? (
    <Link
      className="align-items-center connect-wallet-btn d-inline-flex rounded-1 text-decoration-none text-dark"
      to={`/profile?address=${wallet.account}`}
    >
      <span>{wallet.name}</span>
      <Blockie size="25" src={wallet.image} />
    </Link>
  ) : (
    <button className="connect-wallet-btn rounded-1" onClick={requestAccounts} type="button">
      Connect Wallet
    </button>
  );
}
