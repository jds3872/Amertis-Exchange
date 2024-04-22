"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useChainId } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import {
  TopSwap,
  BottomSwap,
  TokensModal,
  SettingModal,
  Info,
} from "../components/trade";
import { fadeIn } from "@/utils/anim";
import { ToastContainer, toast } from "react-toastify";

// REACT ICONS
import { FiSettings } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { GrFormNext } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { RiArrowUpDownFill } from "react-icons/ri";

import useFetchBalance from "@/hooks/useFetchBalance";
import { useAccount, useReadContract } from "wagmi";
import { TokenList } from "@/lib/TokenList";
import { formatEther, formatUnits, parseEther } from "viem";
import { StaticImageData } from "next/image";
import { config } from "@/config";
import { abi } from "@/config/monagRouterAbi";
import UseSwap from "@/hooks/useSwap";
import { useToast } from "@/components/ui/use-toast";
import useFetchData from "@/hooks/useFetchData";
import { getTokensByChainId } from "@/lib/utils";

export default function Home() {
  // const { data, isLoading, error } = useFetchData(
  //   `https://api.basescan.org/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_BASESCAN}`
  // );
  const chainId = useChainId();
  const tokenList = getTokensByChainId(chainId);

  const [ToggleModal, setToggleModal] = useState<any>({
    mainToggle: false,
    forBase: true,
  });
  const { address, isConnected, isDisconnected } = useAccount();
  const [settingToggle, setSettingToggle] = useState<boolean>(false);
  const [baseToken, setBaseToken] = useState({
    ...tokenList[0],
    tokenBalance: 0,
    inputValue: "",
    price: "",
  });
  const [quoteToken, setQuoteToken] = useState({
    tokenBalance: 0,
    inputValue: "",
    ca: "",
    name: "",
    ticker: "",
    icon: "" as unknown as StaticImageData,
    price: "",
    decimals: 0,
  });
  const { swapData, approval, checkAllowanceAndSwap } = UseSwap(
    baseToken,
    quoteToken
  );

  const { data: baseTokenBalance, isLoading: baseIsLoading } = useFetchBalance(
    address!,
    `${baseToken.ca}-${baseToken.name}`,
    baseToken.ca
  );

  const { data: quoteTokenBalance, isLoading: quoteIsLoading } =
    useFetchBalance(
      address!,
      `${quoteToken.ca}-${quoteToken.name}`,
      quoteToken.ca
    );

  const ReverseTrade = useCallback(() => {
    setBaseToken((prevBaseToken) => ({
      ...quoteToken,
      inputValue: prevBaseToken.inputValue,
    }));
    setQuoteToken((prevQuoteToken) => ({
      ...baseToken,
      inputValue: prevQuoteToken.inputValue,
    }));
  }, [baseToken.ca, quoteToken.ca]);

  useEffect(() => {
    if (baseTokenBalance !== undefined) {
      setBaseToken((prevBaseToken) => ({
        ...prevBaseToken,
        tokenBalance: Number(baseTokenBalance),
        // price: data?.["ethusd"],
      }));
    }
  }, [baseTokenBalance]);

  useEffect(() => {
    if (quoteTokenBalance !== undefined) {
      setQuoteToken((prevQuoteToken) => ({
        ...prevQuoteToken,
        tokenBalance: Number(quoteTokenBalance),
      }));
    }
  }, [quoteTokenBalance]);

  useEffect(() => {
    if (swapData?.amountOut && quoteToken.ca)
      setQuoteToken((prevQuoteToken) => ({
        ...prevQuoteToken,
        inputValue: Number(swapData?.amountOut).toFixed(3) || "0.0",
      }));

    if (baseToken.inputValue.length === 0)
      setQuoteToken((prevQuoteToken) => ({
        ...prevQuoteToken,
        inputValue: "0.0",
      }));
  }, [quoteToken.ca, swapData?.amountOut, baseToken.inputValue]);

  useEffect(() => {
    document.body.style.overflow = ToggleModal.mainToggle ? "hidden" : "auto";
  }, [ToggleModal.mainToggle]);

  const isInsufficient = useMemo(() => {
    return (
      Number(baseToken.inputValue) >
      Number(formatUnits(BigInt(baseToken.tokenBalance), baseToken.decimals))
    );
  }, [baseToken.inputValue, baseToken.tokenBalance]);

  return (
    <>
      <motion.main className="min-h-[calc(100dvh-70px)] mb-80px px-4 py-4 pt-[70px] mt-5 md:w-[462.41px] md:pt-[136px] md:m-auto md:px-0">
        <TopIconSection setSettingToggle={setSettingToggle} />
        <TopSwap
          setToggleModal={setToggleModal}
          ToggleModal={ToggleModal}
          baseToken={baseToken}
          setBaseToken={setBaseToken}
          isLoading={baseIsLoading}
        />
        <RotateTokens ReverseTrade={ReverseTrade} />
        <BottomSwap
          setToggleModal={setToggleModal}
          ToggleModal={ToggleModal}
          quoteToken={quoteToken}
          setQuoteToken={setQuoteToken}
          isLoading={quoteIsLoading}
        />
        {swapData.baseForQuote && (
          <Info
            swapData={swapData}
            baseToken={baseToken}
            quoteToken={quoteToken}
          />
        )}
        {isConnected && (
          <button
            disabled={isInsufficient}
            onClick={() => checkAllowanceAndSwap(swapData, approval)}
            className=" flex items-center justify-center h-[100px] md:h-[54px] w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate disabled:opacity-75"
          >
            {isInsufficient
              ? `Insufficient ${baseToken.ticker} balance`.toUpperCase()
              : approval
              ? "Approve and Swap"
              : "Swap"}
          </button>
        )}
        {isDisconnected && (
          <button className=" flex items-center justify-between gap-4 h-[100px] md:h-[79px] w-full mt-3 py-4 px-[18px] bg-[#8F199B] rounded-[10px] shadow- text-darkBG hover:text-darkSlate">
            <div className=" flex items-center gap-4 text-left">
              <IoWalletOutline className=" text-2xl" />
              <div>
                <h1 className=" font-medium mb-1">Getting Started</h1>
                <p className=" text-sm font-normal">
                  Connect wallet to trade and explore more
                </p>
              </div>
            </div>
            <GrFormNext className=" text-lg justify-items-end " />
          </button>
        )}
      </motion.main>
      <AnimatePresence>
        {ToggleModal.mainToggle && (
          <TokensModal
            setToggleModal={setToggleModal}
            ToggleModal={ToggleModal}
            ReverseTrade={ReverseTrade}
            baseToken={baseToken}
            quoteToken={quoteToken}
            setBaseToken={setBaseToken}
            setQuoteToken={setQuoteToken}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {settingToggle && <SettingModal setSettingToggle={setSettingToggle} />}
      </AnimatePresence>
    </>
  );
}

// -------------------------------------------JUST ICONS SECTION----------
const TopIconSection = ({ setSettingToggle }: any) => {
  return (
    <div className=" flex items-center justify-between text-xl text-darkBG h-[34px] pr-1 pl-2 mb-2 ">
      <div className="font-light cursor-default ">Swap</div>
      <div className=" flex items-center gap-4 W-[72px] mr-2 ">
        <RxReload className=" hover:rotate-180 transition-all duration-300 cursor-pointer " />

        <FiSettings
          onClick={() => setSettingToggle((prev: boolean) => !prev)}
          className=" hover:rotate-180 transition-all duration-300 cursor-pointer "
        />
      </div>
    </div>
  );
};

// ------------------------------THIS IS TO ROTATE THE TOKENS -------------
const RotateTokens = ({ ReverseTrade }: any) => {
  return (
    <section className=" h-[10px] grid place-content-center">
      <div
        onClick={ReverseTrade}
        className=" border border-[#8F199B] bg-[#140123] w-fit p-1 rounded-full m-auto z-10 relative group cursor-pointer "
      >
        <div className=" bg-[#8F199B] text-white rounded-full h-full w-full p-1 group-active:bg-secFG lg:group-hover:rotate-180 ease-in-out transition-all duration-200 ">
          <RiArrowUpDownFill />
        </div>
      </div>
    </section>
  );
};
