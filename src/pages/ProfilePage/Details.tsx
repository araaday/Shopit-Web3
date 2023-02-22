import { FormEvent, ReactNode, useCallback, useContext, useState } from "react";

import "./Details.css";
import Blockie from "../../components/Blockie";
import { ITToken, pinHash } from "../../helpers";
import ImageInput from "./ImageInput";
import IpfsContext from "../../contexts/IpfsContext";

type DetailsProp = {
  balance: ReactNode;
  belongs: boolean;
  seller: WalletType;
};

export default function Details({ balance, belongs, seller }: DetailsProp) {
  const ipfs = useContext(IpfsContext);
  const [src, setSrc] = useState(seller.image);

  const onSubmit = useCallback(
    async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      if (ipfs) {
        const form_element = ev.target as HTMLFormElement;

        const form_data = new FormData(form_element);
        const data = {
          name: form_data.get("name"),
          image: src
        };

        const { cid } = await ipfs.ipfs.add(JSON.stringify(data), {
          cidVersion: 1,
          hashAlg: "blake2b-208"
        });
        const cid_str = cid.toString();

        await Promise.all([
          pinHash(cid_str),
          ITToken().functions.setURI(seller.account, `https://ipfs.io/ipfs/${cid_str}`)
        ]);
      }
    },
    [ipfs, seller, src]
  );

  return (
    <form
      className="bg-light d-flex flex-wrap gap-3 justify-content-center mx-auto px-5 py-4 w-75"
      onSubmit={onSubmit}
    >
      {belongs ? <ImageInput setSrc={setSrc} src={src} /> : <Blockie size="100" src={src} />}
      <div className="d-flex flex-column justify-content-center text-center text-md-start w-75">
        {belongs ? (
          <span className="detail fs-4">
            {"Name: "}
            <input
              className="text-primary"
              defaultValue={seller.name}
              maxLength={20}
              name="name"
              type="text"
            />
          </span>
        ) : seller.name ? (
          <span className="detail fs-4">
            Name: <span className="text-primary">{seller.name}</span>
          </span>
        ) : (
          <></>
        )}
        <span className="detail fs-4">
          Wallet Address: <span className="text-primary">{seller.account}</span>
        </span>
        <span className="detail fs-4">
          Balance: <span className="text-primary">{balance}</span>
        </span>
      </div>
    </form>
  );
}
