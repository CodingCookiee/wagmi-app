import React from "react";
import { useState, useEffect } from "react";
import { Text, Button, Input } from "../";
import {
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTotalSupply,
  getBalance,
  getOwner,
  getAllowance,
} from "../../../services/contractServices2.js";
import { parseUnits, formatUnits } from "ethers";

export const ReadContract = ({ chainId, address, publicClient, isConfirmed }) => {
  const [error, setError] = useState(null);

  // State for storing fetched data
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [totalSupply, setTotalSupply] = useState("");
  const [balance, setBalance] = useState("");
  const [owner, setOwner] = useState("");
  const [allowance, setAllowance] = useState("");
  const [isAllowanceSpender, setIsAllowanceSpender] = useState("");
  const [isAllowanceOwner, setIsAllowanceOwner] = useState("");

  //   Loading States for fetching data
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);

  const fetchTokenData = async () => {
    if (!publicClient || !address) return;

    try {
      // Get token name
      const tokenName = await getTokenName(publicClient);
      if (tokenName) setTokenName(tokenName);
      //   console.log("Token Name: ", tokenName);

      // get token decimals
      const tokenDecimals = await getTokenDecimals(publicClient);
      if (tokenDecimals !== undefined) setTokenDecimals(tokenDecimals);
      //   console.log("Token Decimals: ", tokenDecimals);

      // get token symbol
      const tokenSymbol = await getTokenSymbol(publicClient);
      if (tokenSymbol) setTokenSymbol(tokenSymbol);

      // get total supply
      try {
        const totalSupply = await getTotalSupply(publicClient);
        if (totalSupply) {
          const formattedTotalSupply = formatUnits(totalSupply, tokenDecimals);
          const trimmedTotalSupply =
            formattedTotalSupply.slice(0, 12) +
            "..." +
            formattedTotalSupply.slice(-3);
          setTotalSupply(trimmedTotalSupply);
        }
      } catch (error) {
        console.error("Error getting total supply", error);
        throw error;
      }

      // get balance
      try {
        const balance = await getBalance(publicClient, address);
        if (balance) {
          const formattedBalance = formatUnits(balance, tokenDecimals);

          setBalance(formattedBalance);
        }
      } catch (error) {
        console.error("Error getting balance", error);
        throw error;
      }

      // get owner address
      try {
        const owner = await getOwner(publicClient);
        if (owner) {
          const trimmedAddress = owner.slice(0, 12) + "..." + owner.slice(-3);
          setOwner(trimmedAddress);
        }
      } catch (error) {
        // Added closing brace here
        console.error("Error getting owner", error);
        throw error;
      }

      // get allowance
      //   try {
      //     const allowance = await getAllowance(publicClient, owner, spender);
      //     if (allowance) {
      //       const formattedAllowance = formatUnits(allowance, tokenDecimals);
      //       setAllowance(formattedAllowance);
      //     }
      //   } catch (error) {
      //     console.error("Error getting allowance", error);
      //     throw error;
      //   }
    } catch (error) {
      console.error("Error fetching token data", error);
      setError("Failed to fetch token data");
    }
  };

  const checkAllowance = async () => {
    if (
      !publicClient ||
      !isAllowanceOwner ||
      !isAllowanceSpender ||
      !tokenDecimals
    )
      return;

    try {
      // console.log("About to call getAllowance with:", {
      //   publicClient,
      //   owner: isAllowanceOwner,
      //   spender: isAllowanceSpender
      // });

      const allowanceValue = await getAllowance(
        publicClient,
        isAllowanceOwner,
        isAllowanceSpender
      );

      console.log("Allowance result:", allowanceValue);

      if (allowanceValue !== undefined) {
        const formatted = formatUnits(allowanceValue, tokenDecimals);
        console.log("Formatted allowance:", formatted);
        setAllowance(formatted);
      }
    } catch (error) {
      console.error("Error Checking Allowance", error);
      setError("Failed to check allowance: " + error.message);
    } finally {
      setIsCheckingAllowance(false);
    }
  };

  // loading token info as soon as the address and provider are ready
  useEffect(() => {
    fetchTokenData();
  }, [publicClient, address]);

  // For confirmed transactions
useEffect(() => {
  if (isConfirmed) {
    // Keep your existing code for resetting states
    fetchTokenData();
    setError(null);
  
  }
}, [isConfirmed]);

  return (
    <div className="w-full h-full">
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
              value={isAllowanceOwner}
              onChange={(e) => setIsAllowanceOwner(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Spender address"
              value={isAllowanceSpender}
              onChange={(e) => setIsAllowanceSpender(e.target.value)}
            />
            <div className="flex flex-col items-start justify-center w-full gap-2.5">
              <Button
                variant="default"
                onClick={checkAllowance}
                disabled={
                  !isAllowanceOwner ||
                  !isAllowanceSpender ||
                  isCheckingAllowance
                }
              >
                {isCheckingAllowance ? "Checking..." : "Check Allowance"}
              </Button>
              <div className="flex items-center justify-center gap-2.5">
                <Text variant="h5" weight="semibold">
                  Allowance:
                </Text>
                <Text variant="body">
                  {allowance} {tokenSymbol}
                </Text>
              </div>
            </div>
          </div>
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
