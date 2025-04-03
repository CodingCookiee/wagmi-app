import React from "react";
import { WriteContract } from "./WriteContract";
import { ReadContract } from "./ReadContract";
import {
  useAccount,
  usePublicClient,
  useWriteContract,
  useChainId,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Text, Button, Input, Divider, TransactionStatusOverlay } from "../";
import { toast } from "sonner";

export const ContractInteractions2 = () => {

    const { address } = useAccount();
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const {
        writeContract,
        isPending: isWritePending,
        data: hash,
    } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });


  return (
    <div className="w-full h-full min-h-max flex flex-col items-center justify-center border border-neutral-600 rounded-md py-10">
      <div className="head-txt flex items-center justify-center gap-2.5">
        <span className="">
          <Text variant="h1" align="center" weight="semibold">
            {/* Change it */}
            {/* {tokenName} */} USDT
          </Text>
        </span>
        <Text variant="h1" weight="semibold" align="center">
          Contract Interactions
        </Text>
      </div>

      <Divider className="w-full h-1 bg-neutral-300" />

      {/* TransactionStatusOverlay component */}
      <TransactionStatusOverlay
        isWritePending={isWritePending}
        isConfirming={isConfirming}
        isConfirmed={isConfirmed}
      />

      <ReadContract 
        chainId={chainId}
        address={address}
        publicClient={publicClient}
        isConfirmed={isConfirmed}
      
      />
      <Divider className="w-full h-1 bg-neutral-300" />
      <WriteContract 
        chainId={chainId}
        address={address}
        writeContract={writeContract}
        publicClient={publicClient}
        data={hash}
        isPending= {isWritePending}
        isLoading={isConfirming}
        isConfirmed={isConfirmed} 
    
      />
    </div>
  );
};
