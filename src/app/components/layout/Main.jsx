"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  Account,
  Text,
  ContractInteractions,
  ContractInteractions2,
  NetworkSwitcher,
} from "../ui";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  color: #ffffff;
  background: #1a88f8;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10rem;
  box-shadow: 0 4px 24px -6px #1a88f8;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #1a88f8;
  }
`;

export default function Main() {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [address]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-10 gap-10">
      <div className="max-w-5xl w-full flex items-center justify-center">
        <Text variant="h1" color="default">
          Welcome to Wagmi App
        </Text>
      </div>
      <div className="max-w-5xl w-full flex items-center justify-center">
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <StyledButton onClick={show}>
                {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
              </StyledButton>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
      <div className="max-w-5xl w-full flex items-center justify-center">
        <Account />
      </div>
      {/* Network Switcher component */}
      <div className="max-w-5xl w-full flex items-center justify-center">
        <NetworkSwitcher />
      </div>
      {/* ContractInteraction component */}
      {isConnected && (
        <div className="max-w-5xl w-full h-full flex items-center justify-center">
          <ContractInteractions2 />
        </div>
      )}
    </main>
  );
}
