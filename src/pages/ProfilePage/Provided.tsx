import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Details from "./Details";
import { BLANK_WALLET, formatToken, getWallet, ITToken } from "../../helpers";
import Items from "../../components/Items";
import ItemsContext from "../../contexts/ItemsContext";
import WalletContext from "../../contexts/WalletContext";

import "./Provided.css";

type ProvidedProps = {
  account: string;
};

export default function Provided({ account }: ProvidedProps) {
  const items = useContext(ItemsContext);
  const [wallet] = useContext(WalletContext);
  const belongs = account === wallet.account;

  const [balance, setBalance] = useState("0");
  const [seller, setSeller] = useState<WalletType>(belongs ? wallet : BLANK_WALLET);

  useEffect(() => {
    Promise.allSettled([
      ITToken()
        .functions.balanceOf(account)
        .then((result) => setBalance(formatToken(result[0]))),
      ITToken()
        .functions.walletOf(account)
        .then(async (result) => {
          const { uri }: ITTokenWalletType = result[0];
          const seller = await getWallet({ account, uri });

          setSeller(seller);
        })
    ]);
  }, [account]);

  return (
    <main className="d-flex flex-column gap-5 py-5">
      <Details balance={balance} belongs={belongs} seller={seller} />
      <div className="position-relative">
        <Items items={items} title="Listed Items" />
        {belongs ? (
          <Link
            className="link-secondary listed-items-list-item position-absolute text-decoration-none"
            to="/listing"
          >
            <h4 className="d-flex">+ List Item</h4>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
