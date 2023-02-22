import { createContext } from "react";

export interface Brand {
  name: string;
  id: string;
  image: string;
}

export type Brands = Brand[];

const BrandsContext = createContext<Brands>(undefined!);

export default BrandsContext;
