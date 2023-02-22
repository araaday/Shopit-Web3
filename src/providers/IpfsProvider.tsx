import { blake2b208 } from "@multiformats/blake2/blake2b";
import { create } from "ipfs-core";
import { PropsWithChildren, useEffect, useState } from "react";

import IpfsContext, { Ipfs } from "../contexts/IpfsContext";
import { fetchWTimeout, getWallet } from "../helpers";

const ipfs_promise = create().then((ipfs) => {
  try {
    ipfs.hashers.addHasher(blake2b208);
  } catch (e) {}
  return ipfs;
});

export default function IpfsProvider({ children }: PropsWithChildren) {
  const [ipfs, setIpfs] = useState<Ipfs>(undefined);

  useEffect(() => {
    (async () => {
      const ipfs = await ipfs_promise;

      setIpfs({
        ipfs,
        hydrateItem: async ({ amount, price, seller: mi_seller, id, uri }: MarkITplaceItemType) => {
          const metadata = await fetchWTimeout<ItemMetadataType>(uri);

          const seller = await getWallet({
            account: mi_seller.account.toLowerCase(),
            uri: mi_seller.uri
          });

          const item: ItemType = {
            ...metadata,
            id,
            amount,
            seller,
            price,
            hex_id: id.toHexString()
          };
          return item;
        }
      });
    })();
  }, []);

  return <IpfsContext.Provider value={ipfs}>{children}</IpfsContext.Provider>;
}
