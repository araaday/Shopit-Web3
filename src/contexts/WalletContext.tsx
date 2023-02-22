import { createContext } from "react";

export type ChangeAccounts = (accounts: string[]) => void;

const WalletContext = createContext<[WalletType, ChangeAccounts]>(undefined!);

export default WalletContext;
