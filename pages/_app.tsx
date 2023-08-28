import React from "react";
import "tailwindcss/tailwind.css";
import "../components/custom.scss";
import AppProvider from "../context/AppContext";
import { Mainnet, ChainId, DAppProvider } from "@usedapp/core";
function MyApp({ Component, pageProps }) {
  const config = {
    multicallAddresses: ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
  };
  return (
    <>
      <DAppProvider config={config}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </DAppProvider>
    </>
  );
}

export default MyApp;
