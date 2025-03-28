import React, { useState, useEffect } from "react";
import {
  useAccount,
  usePublicClient,
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits } from "ethers";
import { Text, Button, Input, Divider, TransactionStatusOverlay } from "../";
import {
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getBalance,
  getTotalSupply,
  getOwner,
  getAllowance,
  mintTokens,
  burnTokens,
  approve,
  transferFrom,
  transfer,
  increaseAllowance,
  CONTRACT_ADDRESS,
} from "../../../services/contractServices.js";
import { toast } from 'sonner'

export const ContractInteractions = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const {
    writeContract,
    isPending: isWritePending,
    data: hash,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const [error, setError] = useState(null);

  // States for Read Contract
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [balance, setBalance] = useState("0");
  const [totalSupply, setTotalSupply] = useState("0");
  const [owner, setOwner] = useState("");
  const [allowance, setAllowance] = useState("0");

  // States for Write Contract
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferFromAmount, setTransferFromAmount] = useState("");
  const [transferFromSender, setTransferFromSender] = useState("");
  const [transferFromRecipient, setTransferFromRecipient] = useState("");
  const [increaseAllowanceSpender, setIncreaseAllowanceSpender] = useState("");
  const [increaseAllowanceAmount, setIncreaseAllowanceAmount] = useState("");
  const [checkAllowanceSpender, setCheckAllowanceSpender] = useState("");
  const [checkAllowanceOwner, setCheckAllowanceOwner] = useState("");

  // Individual loading states for each operation
  const [isMinting, setIsMinting] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferringFrom, setIsTransferringFrom] = useState(false);
  const [isIncreasingAllowance, setIsIncreasingAllowance] = useState(false);
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);

  // Function to load token info
  const loadTokenInfo = async () => {
    if (!publicClient || !address) return;

    try {
      // Get token decimals first (needed for formatting)
      const decimals = await getTokenDecimals(publicClient);
      if (decimals !== undefined) setTokenDecimals(decimals);

      // Get token name
      const name = await getTokenName(publicClient);
      if (name) setTokenName(name);

      // Get token symbol
      const symbol = await getTokenSymbol(publicClient);
      if (symbol) setTokenSymbol(symbol);

      // Get Balance
      try {
        const balanceValue = await getBalance(publicClient, address);
        if (balanceValue) {
          // Format the balance directly and store as string
          const formatted = formatUnits(balanceValue, decimals);
          setBalance(formatted);
        }
      } catch (error) {
        console.error("Error getting balance", error);
        setError("Failed to get balance");
      }

      // Get Total Supply
      try {
        const supply = await getTotalSupply(publicClient);
        if (supply) {
          // Format the total supply directly and store as string
          const formatted = formatUnits(supply, decimals);
          const trimmed = formatted.slice(0, 12) + "..." + formatted.slice(-3);
          setTotalSupply(trimmed);
        }
      } catch (error) {
        console.error("Error getting total supply", error);
        setError("Failed to get total supply");
      }

      // Get Owner Address
      try {
        const ownerAddress = await getOwner(publicClient);
        if (ownerAddress) {
          const trimmed =
            ownerAddress.slice(0, 12) + "..." + ownerAddress.slice(-3);
          setOwner(trimmed);
        }
      } catch (error) {
        console.error("Error getting owner", error);
        setError("Failed to get owner");
      }
    } catch (error) {
      console.error("Error loading token info", error);
      setError("Failed to load token info");
    }
  };

  // Function to check allowance
  const checkAllowance = async () => {
    if (
      !publicClient ||
      !checkAllowanceOwner ||
      !checkAllowanceSpender ||
      !tokenDecimals
    )
      return;

    try {
      setError(null);
      setIsCheckingAllowance(true);
      const allowanceValue = await getAllowance(
        publicClient,
        checkAllowanceOwner,
        checkAllowanceSpender
      );
      if (allowanceValue) {
        const formatted = formatUnits(allowanceValue, tokenDecimals);
        setAllowance(formatted);
      }
    } catch (error) {
      console.error("Error checking allowance", error);
      setError("Failed to check allowance");
    } finally {
      setIsCheckingAllowance(false);
    }
  };

  // loading token info as soon as the address and provider are ready
  useEffect(() => {
    loadTokenInfo();
  }, [publicClient, address]);

  // Refresh data after a successful transaction
  useEffect(() => {
    if (isConfirmed) {
      loadTokenInfo();
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


// For pending transactions
// useEffect(() => {
//   if (isWritePending) {
//     toast.info("Processing Your Request ...");
//   }
// }, [isWritePending]);

// // For confirming transactions
// useEffect(() => {
//   if (isConfirming) {
//     toast.warning("Waiting for Confirmation...");
//   }
// }, [isConfirming]);

// For confirmed transactions
useEffect(() => {
  if (isConfirmed) {
    toast.success("Hurrah! Transaction Confirmed.");
    
    // Keep your existing code for resetting states
    loadTokenInfo();
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


  // Handle for writing to the contract
  // handle minting token
  const handleMint = async () => {
    try {
      if (!mintAmount || !tokenDecimals) return;
      setError(null);
      setIsMinting(true);

      const amountWei = parseUnits(mintAmount, tokenDecimals);
      await mintTokens(writeContract, amountWei);
      setMintAmount("");
    } catch (error) {
      setError("Failed to mint tokens");
      console.error("Error minting tokens", error.message);
      setIsMinting(false);
    }
  };

  // handle burning token
  const handleBurn = async () => {
    try {
      if (!burnAmount || !tokenDecimals) return;
      setError(null);
      setIsBurning(true);

      const amountWei = parseUnits(burnAmount, tokenDecimals);
      await burnTokens(writeContract, amountWei);
      setBurnAmount("");
    } catch (error) {
      setError("Failed to burn tokens");
      console.error("Error burning tokens", error.message);
      setIsBurning(false);
    }
  };

  // handle approve
  const handleApprove = async () => {
    try {
      if (!approveAmount || !approveSpender || !tokenDecimals) return;
      setError(null);
      setIsApproving(true);

      const amountWei = parseUnits(approveAmount, tokenDecimals);
      await approve(writeContract, approveSpender, amountWei);

      // Clear inputs
      setApproveAmount("");
      setApproveSpender("");
    } catch (error) {
      setError("Failed to approve tokens");
      console.error("Error approving tokens", error.message);
      setIsApproving(false);
    }
  };

  // handle transfer
  const handleTransfer = async () => {
    try {
      if (!transferAmount || !transferRecipient || !tokenDecimals) return;
      setError(null);
      setIsTransferring(true);

      const amountWei = parseUnits(transferAmount, tokenDecimals);

      // Check if user has enough balance
      const currentBalance = await getBalance(publicClient, address);
      if (amountWei > currentBalance) {
        setError(
          `Insufficient balance. Current balance: ${formatUnits(
            currentBalance,
            tokenDecimals
          )} ${tokenSymbol}`
        );
        setIsTransferring(false);
        return;
      }

      await transfer(writeContract, transferRecipient, amountWei);

      // Clear inputs
      setTransferAmount("");
      setTransferRecipient("");
    } catch (error) {
      setError("Failed to transfer tokens");
      console.error("Error transferring tokens", error.message);
      setIsTransferring(false);
    }
  };

  // handle transferFrom
  const handleTransferFrom = async () => {
    try {
      if (
        !transferFromAmount ||
        !transferFromSender ||
        !transferFromRecipient ||
        !tokenDecimals
      )
        return;
      setError(null);
      setIsTransferringFrom(true);

      const amountWei = parseUnits(transferFromAmount, tokenDecimals);

      // Check if the allowance is sufficient
      const currentAllowance = await getAllowance(
        publicClient,
        transferFromSender,
        address
      );
      console.log(
        "Current allowance:",
        formatUnits(currentAllowance, tokenDecimals)
      );

      if (amountWei > currentAllowance) {
        setError(
          `Insufficient allowance. Current allowance: ${formatUnits(
            currentAllowance,
            tokenDecimals
          )} ${tokenSymbol}`
        );
        setIsTransferringFrom(false);
        return;
      }

      // Check if the sender has enough balance
      const senderBalance = await getBalance(publicClient, transferFromSender);
      if (amountWei > senderBalance) {
        setError(
          `Insufficient balance in sender account. Sender balance: ${formatUnits(
            senderBalance,
            tokenDecimals
          )} ${tokenSymbol}`
        );
        setIsTransferringFrom(false);
        return;
      }

      await transferFrom(
        writeContract,
        transferFromSender,
        transferFromRecipient,
        amountWei
      );

      // Clear inputs
      setTransferFromAmount("");
      setTransferFromSender("");
      setTransferFromRecipient("");
    } catch (error) {
      setError("Failed to transfer tokens");
      console.error("Error transferring tokens", error.message);
      setIsTransferringFrom(false);
    }
  };

  // handle increase allowance
  const handleIncreaseAllowance = async () => {
    try {
      if (
        !increaseAllowanceAmount ||
        !increaseAllowanceSpender ||
        !tokenDecimals
      )
        return;
      setError(null);
      setIsIncreasingAllowance(true);

      const amountWei = parseUnits(increaseAllowanceAmount, tokenDecimals);
      await increaseAllowance(
        writeContract,
        increaseAllowanceSpender,
        amountWei
      );

      // Clear inputs
      setIncreaseAllowanceAmount("");
      setIncreaseAllowanceSpender("");
    } catch (error) {
      setError("Failed to increase allowance");
      console.error("Error increasing allowance", error.message);
      setIsIncreasingAllowance(false);
    }
  };

  
  return (
    <div className="w-full h-full min-h-max flex flex-col items-center justify-center border border-neutral-600 rounded-md py-10">
      <div className="head-txt flex items-center justify-center gap-2.5">
        <span className="">
          <Text variant="h1" align="center" weight="semibold">
            {tokenName}
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

      {/* Read Contract Section */}
      <div className="w-full flex flex-col items-start justify-start px-5 gap-4">
        <Text variant="h2" align="left" weight="semibold">
          Read Contract
        </Text>
        <div className="flex flex-col items-start justify-center ">
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Name:
            </Text>
            <Text variant="body">{tokenName}</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Decimals:
            </Text>
            <Text variant="body">{tokenDecimals}</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Symbols:
            </Text>
            <Text variant="body">{tokenSymbol}</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Balance:
            </Text>
            <Text variant="body">
              {balance} {tokenSymbol}
            </Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Total Supply:
            </Text>
            <Text variant="body">
              {totalSupply} {tokenSymbol}
            </Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Owner Address:
            </Text>
            <Text variant="body">{owner}</Text>
          </div>

          {/* Check Allowance Section */}
          <div className="flex flex-col items-start gap-2.5 mt-4 w-full">
            <Text variant="h5" weight="semibold">
              Check Allowance:
            </Text>
            <Input
              type="text"
              placeholder="Owner address"
              value={checkAllowanceOwner}
              onChange={(e) => setCheckAllowanceOwner(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Spender address"
              value={checkAllowanceSpender}
              onChange={(e) => setCheckAllowanceSpender(e.target.value)}
            />
            <div className="flex items-center justify-between w-full">
              <Button
                variant="default"
                onClick={checkAllowance}
                disabled={
                  !checkAllowanceOwner ||
                  !checkAllowanceSpender ||
                  isCheckingAllowance
                }
              >
                {isCheckingAllowance ? "Checking..." : "Check Allowance"}
              </Button>
              <Text variant="body">
                Allowance: {allowance} {tokenSymbol}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Divider className="w-full h-1 bg-neutral-300" />

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
              disabled={!mintAmount || isMinting}
            >
              {isMinting ? "Processing..." : "Mint"}
            </Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Burn Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
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
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Approve Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
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
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer From Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
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
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Increase Allowance Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
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
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer Section */}
          <div className="flex flex-col items-start gap-2.5 w-full">
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
          </div>

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
