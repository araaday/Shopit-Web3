import { useCallback, useContext } from "react";

import ItemsContext from "../../contexts/ItemsContext";
import { ItemLink } from "../Links";
import Searchbar from "../Searchbar";

export default function NavbarSearchbar() {
  const items = useContext(ItemsContext);

  const getResults = useCallback(
    (query: string) => {
      const results = [];

      let max_l = 5;
      for (const item of items) {
        const name = item.name;
        if (!name.toLowerCase().includes(query.toLowerCase())) continue;

        const id = item.hex_id;
        results.push(
          <ItemLink className="bg-light fs-5 pb-2 pt-1 px-3 text-decoration-none" key={id} id={id}>
            {name}
          </ItemLink>
        );
        max_l--;

        if (!max_l) break;
      }

      return results;
    },
    [items]
  );

  return <Searchbar getResults={getResults} id="navbar" />;
}
