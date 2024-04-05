import { useAccount, useBalance } from "wagmi";
import { useChainId } from "wagmi";
import { config } from "@/config";

const useFetchBalance = (
  walletAddress: `0x${string}`,
  scopeKey: string,
  tokenAddress?: string
) => {
  const { chainId } = useAccount();
  const chain = useChainId();
  const isChainCorrect = chainId === chain;

  const result = useBalance({
    address: isChainCorrect ? (walletAddress as `0x${string}`) : undefined,
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
