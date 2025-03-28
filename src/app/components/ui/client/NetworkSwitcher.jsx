"use client";

import { useAccount, useSwitchChain, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { Text } from "../";
import styled from "styled-components";

const SwitchButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  color: #ffffff;
  background: #ff5722;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: 200ms ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px #ff5722;
  }
`;

// const forceWrongNetwork = true;

export const NetworkSwitcher = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const targetChainId = parseInt(process.env.NEXT_CHAIN_ID || "11155111");

  if (!isConnected) return null;

  if (chainId !== targetChainId ) {
    return (
      <div className="w-1/2 h-full flex flex-col gap-5 p-3 bg-red-100 rounded-lg mb-4">
        <Text variant="body1" color="error" align='center'>
          You are connected to the wrong network!
        </Text>
        <SwitchButton onClick={() => switchChain({ chainId: targetChainId })}>
          Switch to {sepolia.name}
        </SwitchButton>
      </div>
    );
  }

  return null;
};
