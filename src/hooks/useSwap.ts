import { config } from "@/config";
import { abi as routerAbi } from "@/config/monagRouterAbi";
import { abi as tokenAbi } from "@/config/basicTokenAbi";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";

type TokenData = {
  icon: StaticImageData;
  name: string;
  ca: string;
  ticker: string;
  tokenBalance: number | undefined;
  inputValue: string;
};

const UseSwap = (baseToken: TokenData, quoteToken: TokenData) => {
  const { address } = useAccount();
  const [approvalRequired, setApprovalRequired] = useState(false);
  const routerAddress = "0x2c4e238e822eb8769b99fd54accb4c5392ba1b49";
  const inputValue = parseEther(baseToken.inputValue);
  const baseTokenCA = baseToken.ca;
  const quoteTokenCA = quoteToken.ca;
  const gasLimit = 1000000;

  const contractAddress = quoteTokenCA ? routerAddress : undefined;

  // Fetch swap details and allowance
  const {
    data: swapData,
    error: swapError,
    isLoading: isSwapLoading,
  } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: routerAbi,
        functionName: "findBestPathWithGas",
        args: [inputValue, baseTokenCA, quoteTokenCA, 3, 120000],
      },
      {
        address: contractAddress,
        abi: tokenAbi,
        functionName: "allowance",
        args: [address, routerAddress],
      },
    ],
  });

  const { writeContractAsync } = useWriteContract({
    config,
  });

  // Check allowance and perform swap if necessary
  const checkAllowanceAndSwap = async () => {
    const allowance = swapData?.[1].result;
    const isEnough = (allowance as unknown as number) >= +baseToken.inputValue;
    setApprovalRequired(!isEnough);
    await performSwap(isEnough);
  };

  // Perform swap
  const performSwap = async (allowanceEnough: boolean) => {
    const swapInfo = swapData?.[0].result;
    let functionName = "";
    if (baseToken.ticker === "ETH") {
      functionName = "swapNoSplitFromNative";
    } else if (quoteToken.ticker === "ETH") {
      functionName = "swapNoSplitToNative";
    } else {
      functionName = "swapNoSplit";
    }

    const args = [
      [
        swapInfo.amounts[0],
        swapInfo.amounts[1],
        swapInfo.path,
        swapInfo.adapters,
      ],
      address,
      BigInt(3),
    ];

    if (!allowanceEnough) {
      await writeContractAsync({
        abi: tokenAbi,
        address: address as `0x${string}`,
        functionName: "approve",
        args: [routerAddress, baseToken.inputValue],
      });
    }

    await writeContractAsync({
      abi: routerAbi,
      address: routerAddress as `0x${string}`,
      functionName,
      args,
      value: swapInfo.amounts[0],
      gas: BigInt(3000000),
    });

    setApprovalRequired(false);
  };

  return { swapData, checkAllowanceAndSwap, approvalRequired };
};

export default UseSwap;
