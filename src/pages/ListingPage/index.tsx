import { base16 } from "multiformats/bases/base16";
import { useContext, useState } from "react";

import IpfsContext from "../../contexts/IpfsContext";
import { MarkITplace, pinHash, TOKEN_MAGNITUDE } from "../../helpers";

import Col2 from "./Col2";
import ImageInput from "./ImageInput";

import "./index.css";

export default function ItemPage() {
  const ipfs = useContext(IpfsContext);
  const [src, setSrc] = useState("");

  return (
    <main className="d-flex flex-wrap justify-content-center py-5">
      <h1 className="border-bottom border-dark border-2 d-inline">List an Item</h1>
      <form
        className="d-flex flex-wrap justify-content-center mt-4 w-100"
        onSubmit={async (ev) => {
          ev.preventDefault();

          if (ipfs) {
            const form_element = ev.target as HTMLFormElement;

            const form_data = new FormData(form_element);
            const data = {
              name: form_data.get("name"),
              description: form_data.get("description"),
              image: src
            };

            const { cid } = await ipfs.ipfs.add(JSON.stringify(data), {
              cidVersion: 1,
              hashAlg: "blake2b-208"
            });
            const cid_base16 = cid.toString(base16);
            const id = cid_base16.replace("f", "0x");

            await Promise.all([
              pinHash(cid_base16),
              MarkITplace().functions.mint(
                id,
                form_data.get("quantity"),
                TOKEN_MAGNITUDE.mul(form_data.get("price") as string)
              )
            ]);

            form_element.reset();
            setSrc("");
          }
        }}
      >
        <div className="leftWrapper">
          <ImageInput src={src} setSrc={setSrc} />
        </div>
        <div className="rightWrapper">
          <Col2 />
        </div>
        <div className="d-flex justify-content-center mt-5 w-100">
          <div className="btn-solid btn-pri rounded-2">
            <button className="btn btn-lg" type="submit">
              List Item
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
