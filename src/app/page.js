"use client"

import { Web3Provider } from "../Web3Provider";
import { ConnectKitButton } from "connectkit";
import Account from "./components/Account";

export default function Home() {
  return (
    <Web3Provider>
      <main>
        <h1>Welcome to Wagmi App</h1>
        <ConnectKitButton />
        <Account />
      </main>
    </Web3Provider>
  );
}