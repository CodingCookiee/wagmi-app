import { ethers } from "ethers";
import abi from "../abi/abi.json";

// get the contract address from Next.js environment variables
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Read Functions: Read data from the contract using wagmi's publicClient
export const getTokenName = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'name',
    });
    return data;
  } catch (error) {
    console.error("Error reading token name: ", error);
    throw error;
  }
};

export const getTokenSymbol = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'symbol',
    });
    return data;
  } catch (error) {
    console.error("Error reading token symbol: ", error);
    throw error;
  }
};

export const getTokenDecimals = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'decimals',
    });
    return data;
  } catch (error) {
    console.error("Error reading token decimals: ", error);
    throw error;
  }
};

export const getBalance = async (publicClient, address) => {
  if (!address) {
    throw new Error("Address is required to get balance");
  }
  
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'balanceOf',
      args: [address],
    });
    return data;
  } catch (error) {
    console.error("Error reading balance: ", error);
    throw error;
  }
};

export const getTotalSupply = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'totalSupply',
    });
    return data;
  } catch (error) {
    console.error("Error reading total supply: ", error);
    throw error;
  }
};

export const getOwner = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'getOwner',
    });
    return data;
  } catch (error) {
    console.error("Error reading owner: ", error);
    throw error;
  }
};

export const getAllowance = async (publicClient, owner, spender) => {
  if (!owner || !spender) {
    throw new Error("Owner and spender addresses are required");
  }
  
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: 'allowance',
      args: [owner, spender],
    });
    return data;
  } catch (error) {
    console.error("Error reading allowance: ", error);
    throw error;
  }
};

export {
  CONTRACT_ADDRESS,
};
