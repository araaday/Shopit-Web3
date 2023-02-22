import type { BigNumber } from "ethers";
import type { ChangeEvent, Dispatch, HTMLAttributes, SetStateAction } from "react";

declare global {
  // * React * //
  type Attributes = HTMLAttributes<HTMLElement>;
  type SetState<T> = Dispatch<SetStateAction<T>>;
  type InputChangeEvent = ChangeEvent<HTMLInputElement>;

  // * Wallet * //
  type AccountType = {
    account: string;
  };
  type ITTokenWalletType = AccountType & {
    uri: string;
  };
  type WalletMetadataType = {
    name: string;
    image: string;
  };
  type WalletType = AccountType & WalletMetadataType;

  // * Item * //
  type MarkITplaceItemType = {
    id: BigNumber;
    amount: BigNumber;
    seller: ITTokenWalletType & AccountType;
    price: BigNumber;
    uri: string;
  };
  type ItemMetadataType = {
    description: string;
    image: string;
    name: string;
  };
  type HexId = {
    hex_id: string;
  };
  type ItemType = Omit<MarkITplaceItemType & ItemMetadataType, "uri" | "seller"> &
    HexId & {
      seller: WalletType;
    };
  type ItemsType = ItemType[];

  type BNStrKey =
    | "quantity"
    | keyof {
        [K in keyof ItemType as ItemType[K] extends BigNumber ? K : never]: string;
      };
  type CartItemType = Omit<ItemType, BNStrKey> & Record<BNStrKey, string> & HexId;
  type BNCartItemType = ItemType & Record<BNStrKey, BigNumber> & HexId;

  // * Web3 * //
  type EthersParam = string | BigNumber;

  interface Window {
    ethereum: any;
  }
}
