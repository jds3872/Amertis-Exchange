import React from "react";
import { useBalance } from "wagmi";

const useFetchBalance = (
  walletAddress: `0x${string}`,
  scopeKey: string,
  tokenAddress?: string
) => {
  const result = useBalance({
    address: walletAddress as `0x${string}`,
    blockTag: "latest",
    scopeKey: scopeKey,
    token: tokenAddress as `0x${string}`,
  });

  return {
    data: result.data,
    status: result.status,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
};

export default useFetchBalance;
