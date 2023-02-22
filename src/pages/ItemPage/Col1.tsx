import Accordion from "../../components/Accordion";
import AccordionItem from "../../components/AccordionItem";
import Seller from "../../components/Seller";

import "./Col1.css";

export default function Col1({
  amount,
  image,
  name,
  seller
}: Pick<ItemType, "amount" | "image" | "name" | "seller">) {
  return (
    <aside className="leftcontainer">
      <img className="mb-4 rounded-3 w-100" src={image} alt={name} />
      <Accordion id="item-info">
        <AccordionItem header={{ text: "Listing Information" }} id="item-listing">
          Amount sold: {amount.toString()}
        </AccordionItem>
        <AccordionItem header={{ text: "Seller Information" }} id="item-seller">
          <Seller seller={seller} size={25} />
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
