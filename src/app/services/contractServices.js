import { ethers } from "ethers";
import abi from "../abi/abi.json";

// get the contract address from Next.js environment variables
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// initialize contract with provider or signer
export const initContract = async (providerOrSigner) => {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address is not defined in environment variables");
  }

  if (!providerOrSigner) {
    throw new Error("Provider or signer is required");
  }

  return new ethers.Contract(CONTRACT_ADDRESS, abi, providerOrSigner);
};

// Read Functions: Read data from the contract
export const getTokenName = async (provider) => {
  const contract = await initContract(provider);
  try {
    return await contract.name();
  } catch (error) {
    console.error("Error reading token name: ", error);
    throw error;
  }
};

export const getTokenSymbol = async (provider) => {
  const contract = await initContract(provider);
  try {
    return await contract.symbol();
  } catch (error) {
    console.error("Error reading token symbol: ", error);
    throw error;
  }
};

export const getTokenDecimals = async (provider) => {
  const contract = await initContract(provider);
  try {
    return await contract.decimals();
  } catch (error) {
    console.error("Error reading token decimals: ", error);
    throw error;
  }
};

export const getBalance = async (provider, address) => {
  if (!address) {
    throw new Error("Address is required to get balance");
  }

  const contract = await initContract(provider);
  try {
    return await contract.balanceOf(address);
  } catch (error) {
    console.error("Error reading balance: ", error);
    throw error;
  }
};

export const getTotalSupply = async (provider) => {
  const contract = await initContract(provider);
  try {
    return await contract.totalSupply();
  } catch (error) {
    console.error("Error reading total supply: ", error);
    throw error;
  }
};

export const getOwner = async (provider) => {
  const contract = await initContract(provider);
  try {
    return await contract.getOwner();
  } catch (error) {
    console.error("Error reading owner: ", error);
    throw error;
  }
};

export const getAllowance = async (provider, owner, spender) => {
  if (!owner || !spender) {
    throw new Error("Owner and spender addresses are required");
  }

  const contract = await initContract(provider);
  try {
    return await contract.allowance(owner, spender);
  } catch (error) {
    console.error("Error reading allowance: ", error);
    throw error;
  }
};
