import React, { useState, useEffect } from "react";
import { useAccount, usePublicClient, useChainId } from "wagmi";
import * as ethers from "ethers";
import { Text, Button, Input, Divider } from "../";
import {
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getBalance,
  getTotalSupply,
  getOwner,
  getAllowance,
  CONTRACT_ADDRESS,
} from "../../../services/contractServices.js";

export const ContractInteractions = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const chainId = useChainId();
  const [error, setError] = useState(null);

  //  States for Read Contract
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [balance, setBalance] = useState("0");
  const [totalSupply, setTotalSupply] = useState("0");

  // loading token info as soon as the address and provider are ready
  useEffect(() => {
    const loadTokenInfo = async () => {
      if (!publicClient || !address) return;

      try {
        // Get token name
        const name = await getTokenName(publicClient);
        if (name) setTokenName(name);

        // Get token decimals
        const decimals = await getTokenDecimals(publicClient);
        if (decimals) setTokenDecimals(decimals);

        // Get token symbol
        const symbol = await getTokenSymbol(publicClient);
        if (symbol) setTokenSymbol(symbol);

         // Get Balance
         try {
          const balanceValue = await getBalance(publicClient, address);
          if(balanceValue) {
            // Format the balance directly and store as string
            const formatted = ethers.formatUnits(balanceValue, decimals);
            setBalance(formatted);
          }
        } catch(error) {
          console.error("Error getting balance", error);
          setError('Failed to get balance');
        }

        // Get Total Supply
        try {
          const supply = await getTotalSupply(publicClient);
          console.log("Total Supply:", supply);
          if(supply) {
            // Format the total supply directly and store as string
            const formatted = ethers.formatUnits(supply, decimals);
            const trimmed= formatted.slice(0, 12) +
            "..." +
            formatted.slice(-3);
            setTotalSupply(trimmed);
          }
        } catch(error) {
          console.error("Error getting total supply", error);
          setError('Failed to get total supply');
        }
      } catch (error) {
        console.error("Error loading token info", error);
        setError("Failed to load token info");
      }
    };

    // Call the function
    loadTokenInfo();
  }, [publicClient, address]);

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
            <Text variant="body">{balance} usdt</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Total Supply:
            </Text>
            <Text variant="body">{totalSupply}USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Owner Address:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Allowance:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
        </div>
      </div>

      <Divider className="w-full h-1 bg-neutral-300" />

      {/* Write  Contract Section */}
      <div className="w-full h-full flex flex-col items-start justify-start px-5 gap-4">
        <Text variant="h2" align="left" weight="semibold">
          Read Contract
        </Text>
        <div className="flex flex-col items-start justify-center ">
          {/* Mint Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Mint
            </Text>
            <Input type="number" placeholder="Amount to mint" />
            <Button variant="default">Mint</Button>
          </div>

          <Divider className=" w-full h-1 bg-neutral-300" />
          {/* Burn Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Burn
            </Text>
            <Input type="number" placeholder="Amount to burn" />
            <Button variant="default">Burn</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Approve Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Approve
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Approve</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer From Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Transfer From
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Recipient" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Transfer From</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Increase Allowance Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Increase Allowance
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Add a value" />
            <Button variant="default">Increase Allowance</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Transfer
            </Text>
            <Input type="number" placeholder="Recipient" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Transfer</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};
