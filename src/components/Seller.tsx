import { Link } from "react-router-dom";

import type { ReactNode } from "react";

import Blockie, { BlockieProps } from "./Blockie";

import "./Seller.css";

type SellerProps = Pick<Attributes, "className"> &
  Pick<BlockieProps, "size"> & {
    seller: WalletType;
    prefix?: ReactNode;
  };

export default function Seller({ className, prefix, seller, size }: SellerProps) {
  return (
    <Link
      className={`align-items-center d-flex text-decoration-none ${className || ""}`}
      to={`/profile?address=${seller.account}`}
    >
      {prefix ? <span className="seller-prefix">{prefix}</span> : <></>}
      <Blockie size={size} src={seller.image} />
      <span className="seller-address">{seller.name}</span>
    </Link>
  );
}
