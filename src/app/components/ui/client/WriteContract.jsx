import React, { useState, useEffect } from "react";
import {
  getTokenDecimals,
  mintTokens,
  burnTokens,
  approveTokens,
  transferFrom,
  transferTokens,
  increaseAllowance,
  decreaseAllowance,
} from "../../../services/contractServices2.js";
import { Text, Button, Input, Divider, TransactionStatusOverlay } from "../";
import { parseUnits, formatUnits } from "ethers";
import { toast } from 'sonner'

export const WriteContract = ({
  chainId,
  address,
  writeContract,
  publicClient,
  isConfirmed
}) => {
  const [error, setError] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(null);


  // Individual loading states for each operation
  const [isMinting, setIsMinting] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferringFrom, setIsTransferringFrom] = useState(false);
  const [isIncreasingAllowance, setIsIncreasingAllowance] = useState(false);
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);


  // States for Contract Interactions
  const [mintAmount, setMintAmount] = useState("");

  const fetchTokenData = async () => {
    if (!publicClient || !address) return;

    try {
      // get token decimals
      const tokenDecimals = await getTokenDecimals(publicClient);
      if (tokenDecimals !== undefined) setTokenDecimals(tokenDecimals);
      //   console.log("Token Decimals: ", tokenDecimals);
    } catch (error) {
      console.error("Error fetching token data", error);
      setError("Failed to fetch token data");
      // setIsMinting(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, [publicClient, address]);

  // For confirmed transactions
useEffect(() => {
  if (isConfirmed) {
    toast.success("Hurrah! Transaction Confirmed.");

    setError(null);
    
    // Reset all operation states
    setIsMinting(false);
    setIsBurning(false);
    setIsApproving(false);
    setIsTransferring(false);
    setIsTransferringFrom(false);
    setIsIncreasingAllowance(false);
  }
}, [isConfirmed]);

// For errors
useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);


  const handleMint = async () => {
    if (!mintAmount || !tokenDecimals) return;
    try {
      setError(null);
      // setIsMinting(true);

      const amountWei = parseUnits(mintAmount, tokenDecimals);
      await mintTokens(writeContract, amountWei);
      setMintAmount("");
    } catch (error) {
      setError("Error minting tokens ");
      console.error("Error minting tokens: ", error);
      // setIsMinting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start  gap-4">
      {/* Write Contract Section */}
      <div className="w-full h-full flex flex-col items-start justify-start px-5 gap-4">
        <Text variant="h2" align="left" weight="semibold">
          Write Contract
        </Text>
        <div className="flex flex-col items-start justify-center w-full">
          {/* Mint Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
            <Text variant="h4" weight="semibold" align="left">
              Mint
            </Text>
            <Input
              type="text"
              required
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="Amount to mint"
            />
            <Button
              variant="default"
              onClick={handleMint}
              disabled={!mintAmount}
            //   disabled={!mintAmount || isMinting}
            >
              {/* {isMinting ? "Processing..." : "Mint"} */}
              Mint
            </Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Burn Section */}
          {/* <div className="flex flex-col items-start gap-2.5 w-full">
      <Text variant="h4" weight="semibold" align="left">
        Burn
      </Text>
      <Input
        type="text"
        required
        value={burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
        placeholder="Amount to burn"
      />
      <Button
        variant="default"
        onClick={handleBurn}
        disabled={!burnAmount || isBurning}
      >
        {isBurning ? "Processing..." : "Burn"}
      </Button>
    </div> */}

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Approve Section */}
          {/* <div className="flex flex-col items-start gap-2.5 w-full">
      <Text variant="h4" weight="semibold" align="left">
        Approve
      </Text>
      <Input
        type="text"
        required
        value={approveSpender}
        onChange={(e) => setApproveSpender(e.target.value)}
        placeholder="Spender address"
      />
      <Input
        type="text"
        required
        value={approveAmount}
        onChange={(e) => setApproveAmount(e.target.value)}
        placeholder="Amount to approve"
      />
      <Button
        variant="default"
        onClick={handleApprove}
        disabled={!approveAmount || !approveSpender || isApproving}
      >
        {isApproving ? "Processing..." : "Approve"}
      </Button>
    </div> */}

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer From Section */}
          {/* <div className="flex flex-col items-start gap-2.5 w-full">
      <Text variant="h4" weight="semibold" align="left">
        Transfer From
      </Text>
      <Input
        type="text"
        required
        value={transferFromSender}
        onChange={(e) => setTransferFromSender(e.target.value)}
        placeholder="Sender address"
      />
      <Input
        type="text"
        required
        value={transferFromRecipient}
        onChange={(e) => setTransferFromRecipient(e.target.value)}
        placeholder="Recipient address"
      />
      <Input
        type="text"
        required
        value={transferFromAmount}
        onChange={(e) => setTransferFromAmount(e.target.value)}
        placeholder="Amount"
      />
      <Button
        variant="default"
        onClick={handleTransferFrom}
        disabled={
          !transferFromAmount ||
          !transferFromSender ||
          !transferFromRecipient ||
          isTransferringFrom
        }
      >
        {isTransferringFrom ? "Processing..." : "Transfer From"}
      </Button>
    </div> */}

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Increase Allowance Section */}
          {/* <div className="flex flex-col items-start gap-2.5 w-full">
      <Text variant="h4" weight="semibold" align="left">
        Increase Allowance
      </Text>
      <Input
        type="text"
        required
        value={increaseAllowanceSpender}
        onChange={(e) => setIncreaseAllowanceSpender(e.target.value)}
        placeholder="Spender address"
      />
      <Input
        type="text"
        required
        value={increaseAllowanceAmount}
        onChange={(e) => setIncreaseAllowanceAmount(e.target.value)}
        placeholder="Amount to add"
      />
      <Button
        variant="default"
        onClick={handleIncreaseAllowance}
        disabled={
          !increaseAllowanceAmount ||
          !increaseAllowanceSpender ||
          isIncreasingAllowance
        }
      >
        {isIncreasingAllowance ? "Processing..." : "Increase Allowance"}
      </Button>
    </div> */}

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer Section */}
          {/* <div className="flex flex-col items-start gap-2.5 w-full">
      <Text variant="h4" weight="semibold" align="left">
        Transfer
      </Text>
      <Input
        type="text"
        required
        value={transferRecipient}
        onChange={(e) => setTransferRecipient(e.target.value)}
        placeholder="Recipient address"
      />
      <Input
        type="text"
        required
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        placeholder="Amount"
      />
      <Button
        variant="default"
        onClick={handleTransfer}
        disabled={!transferAmount || !transferRecipient || isTransferring}
      >
        {isTransferring ? "Processing..." : "Transfer"}
      </Button>
    </div> */}

          <Divider className="w-full h-1 bg-neutral-300" />
        </div>

        {/* Error display */}
        {error && (
          <div className="w-full p-3 bg-red-100 rounded-lg mt-4">
            <Text variant="body" color="error" align="center">
              {error}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
