import { PropsWithChildren, useContext, useEffect, useState } from "react";
import IpfsContext from "../contexts/IpfsContext";

import ItemsContext from "../contexts/ItemsContext";
import WalletContext from "../contexts/WalletContext";

type ItemsProviderProps = PropsWithChildren & { getItems: () => Promise<[MarkITplaceItemType[]]> };

export default function ItemsProvider({ children, getItems: getItemsProp }: ItemsProviderProps) {
  const ipfs = useContext(IpfsContext);
  const [wallet] = useContext(WalletContext);
  const [items, setItems] = useState<ItemsType>([]);

  useEffect(() => {
    if (wallet.account && ipfs) {
      (async () => {
        const result = await getItemsProp();
        const items_promise = result[0].filter(({ id }) => Boolean(id)).map(ipfs.hydrateItem);

        const items_settled = await Promise.allSettled(items_promise);

        const items = [];

        for (const item of items_settled) {
          if (item.status === "fulfilled") items.push(item.value);
        }

        setItems(items);
      })();
    }
  }, [getItemsProp, ipfs, wallet]);

  return <ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>;
}
