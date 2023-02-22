import { createContext } from "react";

import type { create } from "ipfs-core";

export type Ipfs =
  | {
      ipfs: Awaited<ReturnType<typeof create>>;
      hydrateItem: (mi: MarkITplaceItemType) => Promise<ItemType>;
    }
  | undefined;

const IpfsContext = createContext<Ipfs>(undefined);

export default IpfsContext;
