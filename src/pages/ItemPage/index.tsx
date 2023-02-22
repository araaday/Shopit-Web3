import Col1 from "./Col1";
import Col2 from "./Col2";
import { useLocation } from "react-router-dom";
import IpfsContext from "../../contexts/IpfsContext";
import { BLANK_ITEM, MarkITplace } from "../../helpers";
import { useContext, useEffect, useState } from "react";

import "./index.css";

export default function ItemPage() {
  const ipfs = useContext(IpfsContext);
  const location = useLocation();
  const [item, setItem] = useState(BLANK_ITEM);

  useEffect(() => {
    const search_params = new URLSearchParams(location.search);
    const id = search_params.get("id");

    if (id) {
      MarkITplace()
        .functions.getItem(id)
        .then((result) => ipfs?.hydrateItem(result[0]))
        .then((hydrated_item) => hydrated_item && setItem(hydrated_item));
    }
  }, [ipfs, location]);

  return (
    <main className="d-flex flex-wrap justify-content-center py-5">
      <div className="leftWrapper">
        <Col1 {...item} />
      </div>
      <div className="rightWrapper">
        <Col2 {...item} />
      </div>
    </main>
  );
}
