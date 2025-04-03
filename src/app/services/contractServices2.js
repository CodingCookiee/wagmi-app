import abi from "../abi/abi.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Read Functions: Read data from the contract using wagmi's publicClient

export const getTokenName = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "name",
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
      functionName: "symbol",
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
      functionName: "decimals",
    });
    return data;
  } catch (error) {
    console.error("Error reading token decimals: ", error);
    throw error;
  }
};

export const getTotalSupply = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "totalSupply",
    });
    return data;
  } catch (error) {
    console.error("Error reading total supply: ", error);
    throw error;
  }
};

export const getBalance = async (publicClient, address) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "balanceOf",
      args: [address],
    });
    return data;
  } catch (error) {
    console.error("Error reading balance: ", error);
    throw error;
  }
};

export const getOwner = async (publicClient) => {
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "owner",
    });
    return data;
  } catch (error) {
    console.error("Error reading owner: ", error);
    throw error;
  }
};

export const getAllowance = async (publicClient, owner, spender) => {
  if (!owner || !spender)
    return new Error("Owner and spender addresses are required");
  try {
    const data = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "allowance",
      args: [owner, spender],
    });
    return data;
  } catch (error) {
    console.error("Error reading allowance: ", error);
    throw error;
  }
};

// Write Functions: Write data to the contract using wagmi's writeClient

export const mintTokens = async (writeContract, amount) => {
  if (!amount) return new Error("Amount is required");
  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "mint",
      args: [amount],
    });
  } catch (error) {
    console.error("Error minting tokens: ", error);
    throw error;
  }
};

export const burnTokens = async (writeContract, amount) => {
  if (!amount) return new Error("Amount is required");

  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "burn",
      args: [amount],
    });
  } catch (error) {
    console.error("Error burning tokens: ", error);
    throw error;
  }
};

export const approveTokens = async (writeContract, spender, amount) => {
  if (!spender || !amount) return new Error("Spender and amount are required");

  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "approve",
      args: [spender, amount],
    });
  } catch (error) {
    console.error("Error approving tokens: ", error);
    throw error;
  }
};

export const transferFrom = async (
  writeContract,
  spender,
  recipient,
  amount
) => {
  if (!spender || !recipient || !amount)
    return new Error("Spender, recipient, and amount are required");

  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "transferFrom",
      args: [spender, recipient, amount],
    });
  } catch (error) {
    console.error("Error transferring tokens: ", error);
    throw error;
  }
};

export const transferTokens = async (writeContract, recipient, amount) => {
  if (!recipient || !amount)
    return new Error("Recipient and amount are required");

  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "transfer",
      args: [recipient, amount],
    });
  } catch (error) {
    console.error("Error transferring tokens: ", error);
    throw error;
  }
};

export const increaseAllowance = async (writeContract, spender, addedValue) => {
  if (!spender || !addedValue)
    return new Error("Spender and added value are required");

  try {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "increaseAllowance",
      args: [spender, addedValue],
    });
  } catch (error) {
    console.error("Error increasing allowance: ", error);
    throw error;
  }
};

export const decreaseAllowance = async (
  writeContract,
  spender,
  subtractedValue
) => {
  if (!spender || !subtractedValue)
    return new Error("Spender and subtracted value are required");

  try {
    return writeContract({
      added: CONTRACT_ADDRESS,
      abi,
      functionName: "decreaseAllowance",
      args: [spender, subtractedValue],
    });
  } catch (error) {
    console.error("Error decreasing allowance: ", error);
    throw error;
  }
};


export {
  CONTRACT_ADDRESS
}
