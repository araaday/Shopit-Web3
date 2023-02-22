import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import WalletContext from "../contexts/WalletContext";
import { BLANK_WALLET, getWallet, ITToken } from "../helpers";

export default function WalletProvider({ children }: PropsWithChildren) {
  const [wallet, setWallet] = useState<WalletType>(BLANK_WALLET);

  const changeAccounts = useCallback(async (accounts: string[]) => {
    const address = accounts[0];

    if (address) {
      const itt_wallet = (await ITToken().functions.walletOf(address))[0] as ITTokenWalletType;
      const wallet = await getWallet({
        account: itt_wallet.account.toLowerCase(),
        uri: itt_wallet.uri
      });
      setWallet(wallet);
    }
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", changeAccounts);
  }, [changeAccounts]);

  return (
    <WalletContext.Provider value={[wallet, changeAccounts]}>{children}</WalletContext.Provider>
  );
}
