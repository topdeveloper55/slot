import React from 'react'
import 'tailwindcss/tailwind.css'
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "../components/custom.scss"



function MyApp({ Component, pageProps }) {


  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <Component {...pageProps} />   
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default MyApp
