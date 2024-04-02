"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TopSwap,
  BottomSwap,
  TokensModal,
  SettingModal,
} from "../components/trade";
import { fadeIn } from "@/utils/anim";

// REACT ICONS

import { FiSettings } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { GrFormNext } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { RiArrowUpDownFill } from "react-icons/ri";

import ethLogo from "/public/Images/testnet-token-icons-main/ethLogo.png";
import usdcLogo from "/public/Images/testnet-token-icons-main/usdcLogo.png";

export default function Home() {
  const [ToggleModal, setToggleModal] = useState<any>({
    mainToggle: false,
    forBase: true,
  }); //state for modal toggling and to set parameters to change base or quote token accordingly.
  const [settingToggle, setSettingToggle] = useState<boolean>(false);
  const [baseToken, setBaseToken] = useState({
    tokenIcon: ethLogo,
    tokenName: "ETH",
    tokenBalance: 0.132,
    inputValue: "",
  });

  const [quoteToken, setQuoteToken] = useState({
    tokenIcon: usdcLogo,
    tokenName: "USDC",
    tokenBalance: 400,
    inputValue: "",
  });
  // const [baseInput, setBaseInput] = useState<string | number>(""); //state for base input amount
  // const [quoteInput, setQuoteInput] = useState<string | number>(""); //state for quote input amount
  // const [baseInputValue, setBaseInputValue] = useState<number | null>(300); //state for value of the inputed amount
  // const [quoteInputValue, setQuoteInputValue] = useState<number | null>(1854); //state for quote input amount

  //state for other baseToken data
  //   const [baseTokenData, setBaseTokenData] = useState<any>({
  //     tokenIcon: ethLogo,
  //     tokenName: "ETH",
  //     tokenBalance: 0.132,
  //   });
  //   //state for other quote token data
  //   const [quoteTokenData, setQuoteTokenData] = useState<any>({
  //     tokenIcon: usdcLogo,
  //     tokenName: "USDC",
  //     tokenBalance: 400,
  //   });

  // ---------THIS IS TO SWITCH BASE AND QUOTE TOKENS
  const ReverseTrade = () => {
    setBaseToken(quoteToken);
    setQuoteToken(baseToken);
    // setBaseTokenData(quoteTokenData);
    // setBaseInput(quoteInput);
    // setQuoteTokenData(baseTokenData);
    // setQuoteInput(baseInput);
  };

  // ---------------THIS IS TO STOP SCROLL ON MODAL DISPLAY
  useEffect(() => {
    document.body.style.overflow = ToggleModal.mainToggle ? "hidden" : "auto";
  }, [ToggleModal]);

  return (
    <>
      <motion.main className="min-h-[calc(100dvh-70px)] mb-80px px-4 py-4 pt-[70px] mt-5 md:w-[462.41px] md:pt-[136px] md:m-auto md:px-0">
        <TopIconSection setSettingToggle={setSettingToggle} />
        <TopSwap
          setToggleModal={setToggleModal}
          ToggleModal={ToggleModal}
          baseToken={baseToken}
          quoteToken={quoteToken}
          setBaseToken={setBaseToken}
          setQuoteToken={setQuoteToken}
          //   baseTokenData={baseTokenData}
          //   setBaseTokenData={setBaseTokenData}
          //   baseInput={baseInput}
          //   setBaseInput={setBaseInput}
          //   baseInputValue={baseInputValue}
        />
        <RotateTokens ReverseTrade={ReverseTrade} />
        <BottomSwap
          setToggleModal={setToggleModal}
          ToggleModal={ToggleModal}
          baseToken={baseToken}
          quoteToken={quoteToken}
          setBaseToken={setBaseToken}
          setQuoteToken={setQuoteToken}
          //   quoteTokenData={quoteTokenData}
          //   quoteInput={quoteInput}
          //   setQuoteInput={setQuoteInput}
          //   quoteInputValue={quoteInputValue}
          //   setQuoteTokenData={setQuoteTokenData}
        />

        {/* The wallet connect sections */}
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

        {/* <div className=" h-[200px] bg-red-200 "> </div> */}
      </motion.main>

      {/*  ---------------------------------------MODAL FOR TOKEN SEARCH ---- */}
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

      {/*  ---------------------------------------MODAL FOR SETTING ---- */}
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
