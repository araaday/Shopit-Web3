import blockies from "ethereum-blockies";
import { BigNumber, Contract, providers } from "ethers";

import MarkITplace_config from "./MarkITplace.json";
import ITEvent_config from "./ITEvent.json";
import ITToken_config from "./ITToken.json";
import pinata_config from "./pinata.json";

export const provider = () => new providers.Web3Provider(window.ethereum);

const signer = () => provider().getSigner();

export function MarkITplace() {
  return new Contract(MarkITplace_config.address, MarkITplace_config.ABI, signer());
}

export function buyItem<T extends Pick<CartItemType | BNCartItemType, "id" | "quantity">>(item: T) {
  return MarkITplace().functions.buy(item.id, item.quantity);
}

export function ITEvent() {
  return new Contract(ITEvent_config.address, ITEvent_config.ABI, signer());
}

export function ITToken() {
  return new Contract(ITToken_config.address, ITToken_config.ABI, signer());
}

export const BN0 = BigNumber.from("0");
export const BLANK_WALLET: WalletType = {
  account: "",
  image: "",
  name: ""
};
export const BLANK_ITEM: ItemType = {
  id: BN0,
  amount: BN0,
  seller: BLANK_WALLET,
  price: BN0,
  hex_id: "",
  description: "",
  image: "",
  name: ""
};
export const BN1 = BigNumber.from("1");
export const TOKEN_MAGNITUDE = BigNumber.from("1000000000000000000");

export function addressToBlockie(address: string) {
  return blockies
    .create({
      seed: address
    })
    .toDataURL();
}

const cnf = Intl.NumberFormat(undefined, { notation: "compact" });

export function formatToken(bn: EthersParam) {
  const tokens = cnf.format(BigNumber.from(bn).div(TOKEN_MAGNITUDE).toBigInt());
  return `${tokens} Token${tokens === "1" ? "" : "s"}`;
}

/**
 * Fetch w/ Timeout
 * Parses Response to JSON
 * Rejects if !res.ok
 */
export async function fetchWTimeout<T>(
  input: RequestInfo | URL,
  init: Omit<RequestInit, "signal"> = {},
  timeout = 3000
) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  const res = await fetch(input, { ...init, signal: controller.signal });
  if (res.ok) return res.json() as T;
  return Promise.reject();
}

export async function getWallet({ account, uri }: ITTokenWalletType): Promise<WalletType> {
  const { image, name } = await fetchWTimeout<Partial<WalletType>>(uri).catch<Partial<WalletType>>(
    () => ({})
  );
  return {
    account: account,
    image: image || addressToBlockie(account),
    name: name || shortenAddress(account)
  };
}

export function pinHash(hashToPin: string) {
  return fetch("https://api.pinata.cloud/pinning/pinByHash", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${pinata_config.pinataJWTKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      hashToPin,
      pinataOptions: { cidVersion: 1 }
    })
  });
}

export function shortenAddress(address: string, chars = 3) {
  return `${address.slice(0, 2 + chars)}...${address.slice(chars * -1)}`;
}

type RGB = [number, number, number];
type RGBW = [...RGB, number];
// rgb table: [red, green, blue, weight]
const RGBWS: Record<string, RGBW> = {
  // basic primary rgbs:
  red: [255, 0, 0, 0.9],
  yellow: [255, 255, 0, 0.7],
  green: [0, 255, 0, 1.1],
  cyan: [0, 255, 255, 0.9],
  blue: [0, 0, 255, 1.05],
  purple: [255, 0, 255, 0.85],
  // grays:
  black: [0, 0, 0, 0.15],
  white: [255, 255, 255, 0.2],
  gray: [127, 127, 127, 0.1],
  grey: [127, 127, 127, 0.1], // British spelling
  // other rgbs, with reduced weights (could add a lot more):
  brown: [191, 127, 0, 0.5],
  orange: [255, 127, 0, 0.5],
  indigo: [127, 0, 255, 0.5],
  magenta: [255, 0, 255, 0.5],
  pink: [255, 127, 127, 0.5]
};
/**
 * * Levenshtein distance algorithm by Marco de Wit, http://stackoverflow.com/a/18514751
 */
function levenshtein(str: string, color: string) {
  const str_len = str.length;
  const color_len = color.length;
  if (str_len && color_len) {
    let str_i = 0;
    let color_i = 0;
    let a = 0;
    let b = 0;
    let c = 0;
    let c2 = 0;
    const row = [];
    while (str_i < str_len) row[str_i] = ++str_i;
    while (color_i < color_len) {
      c2 = color.charCodeAt(color_i);
      a = color_i;
      ++color_i;
      b = color_i;
      for (let i1 = 0; i1 < str_len; ++i1) {
        c = a + (str.charCodeAt(i1) === c2 ? 0 : 1);
        a = row[i1] as number;
        b = b < a ? (b < c ? b + 1 : c) : a < c ? a + 1 : c;
        row[i1] = b;
      }
    }
    return b;
  } else {
    return str_len + color_len;
  }
}
/**
 * Converts a string to RGB values
 * * Adapted from http://jsfiddle.net/4d8Pv
 */
export function strToRgb(str: string) {
  const rgbw = RGBWS[str];

  if (rgbw) return rgbw.slice(0, 3) as RGB;

  let rgb: RGB = [0, 0, 0];
  let div = 0;
  for (const color in RGBWS) {
    const dist = levenshtein(str, color);
    const rgbw = RGBWS[color] as RGBW;
    const w = rgbw[3] / (dist * dist);
    for (let i = 0; i < 3; i++) {
      rgb[i] += (rgbw[i] as number) * w;
    }
    div += w;
  }
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.round((rgb[i] as number) / div);
  }
  return rgb;
}
