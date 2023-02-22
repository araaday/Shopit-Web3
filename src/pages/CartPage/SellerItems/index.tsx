import SellerItem from "./SellerItem";

import "./index.css";
import Seller from "../../../components/Seller";

type SellerItemsProps = {
  seller: WalletType;
  items: BNCartItemType[];
};

export default function SellerItems({ seller, items }: SellerItemsProps) {
  const item_elements = [];

  for (const item of items) {
    item_elements.push(<SellerItem key={item.hex_id} {...item} />);
  }

  return (
    <div className="align-items-center card seller-items d-flex flex-column glassmorphic glassmorphic-pri rounded-1">
      <Seller seller={seller} className="card-header fs-3 w-100" prefix="From" size={50} />
      <ol className="fs-4 list-group list-group-flush list-group-numbered w-100">
        {item_elements}
      </ol>
    </div>
  );
}
