import { useLocation } from "react-router-dom";

import { MarkITplace } from "../../helpers";
import ItemsProvider from "../../providers/ItemsProvider";

import Provided from "./Provided";

export default function ProfilePage() {
  const { search } = useLocation();
  const search_params = new URLSearchParams(search);
  const address = search_params.get("address") || "";

  return (
    <ItemsProvider getItems={() => MarkITplace().functions.getSellerItems(address)}>
      <Provided account={address} />
    </ItemsProvider>
  );
}
