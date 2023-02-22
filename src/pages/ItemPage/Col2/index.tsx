import { formatToken } from "../../../helpers";
import Actions from "./Actions";
import Quantity from "./Quantity";

import "./index.css";

export default function Col2(item: ItemType) {
  return (
    <div className="d-flex flex-column gap-4 rightcontainer">
      <h2>{item.name}</h2>
      <div className="bg-light border border-dark d-flex flex-wrap rounded-3">
        <div className="border-bottom border-secondary d-flex flex-column flex-xxl-row gap-3 half-grow px-5 py-4 text-grey w-100">
          <div className="d-flex flex-column flex-md-row fs-3 align-items-center text-info">
            <span className="me-md-2">Price:</span>
            <span>{formatToken(item.price)}</span>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center">
            <div className="fs-3 me-md-3">Quantity:</div>
            <Quantity {...item} />
          </div>
        </div>
        <Actions {...item} />
      </div>
      <div className="d-flex flex-wrap">
        <h3 className="d-inline pb-1 title-underline">Description</h3>
        <div className="w-100">{item.description}</div>
      </div>
    </div>
  );
}
