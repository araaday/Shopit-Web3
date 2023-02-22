import { BigNumber } from "ethers";

import { ItemLink } from "../../../../components/Links";
import { formatToken } from "../../../../helpers";

import "./index.css";
import BuyBtn from "./BuyBtn";
import Quantity from "./Quantity";

export default function SellerItem(props: BNCartItemType) {
  return (
    <li className="align-items-start bg-light d-flex flex-column flex-lg-row gap-3 align-items-center align-items-lg-start list-group-item seller-item">
      <ItemLink id={props.hex_id}>
        <img
          alt={props.name}
          className="aspect-ratio-square object-cover"
          src={props.image}
          width="150"
        />
      </ItemLink>
      <div className="d-flex flex-column flex-grow-1 justify-content-between text-center text-lg-start">
        <header className="w-100">{props.name}</header>
        <p className="fs-6 item-price mb-1">
          Price: {formatToken(BigNumber.from(props.price).mul(props.quantity))}
        </p>
      </div>
      <div className="badge d-flex flex-column fs-6 gap-1">
        <Quantity {...props} />
        <BuyBtn {...props} />
      </div>
    </li>
  );
}
