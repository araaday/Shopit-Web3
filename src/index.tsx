import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "react-use-cart";
import App from "./App";
import ItemsProvider from "./providers/ItemsProvider";
import WalletProvider from "./providers/WalletProvider";
import { MarkITplace } from "./helpers";
import IpfsProvider from "./providers/IpfsProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <StrictMode>
    <IpfsProvider>
      <WalletProvider>
        <ItemsProvider getItems={MarkITplace().functions.getAllItems}>
          <CartProvider>
            <App />
          </CartProvider>
        </ItemsProvider>
      </WalletProvider>
    </IpfsProvider>
  </StrictMode>
);
