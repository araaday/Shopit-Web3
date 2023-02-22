import { ItemLink } from "../Links";

import { formatToken } from "../../helpers";

import "./Item.css";

type ItemProps = Pick<ItemType, "hex_id" | "image" | "name" | "price">;

export default function Item({ hex_id, image, name, price }: ItemProps) {
  return (
    <ItemLink
      className="bg-light card d-flex flex-column flex-grow-1 flex-sm-grow-0 item position-relative shadow-sm text-decoration-none"
      id={hex_id}
    >
      <div className="card-img-top">
        <img className="aspect-ratio-square d-block object-cover w-100" alt={name} src={image} />
      </div>
      <div className="card-body pb-0 pt-2 ps-2">
        <p className="card-text text-black">{name}</p>
      </div>
      <div className="align-items-center card-stats d-flex p-2 pb-0 text-info">
        {formatToken(price)}
      </div>
    </ItemLink>
  );
}
