import { Dispatch, SetStateAction, useCallback } from "react";
import TokenButton from "./TokenButton";

import ethLogo from "/public/Images/testnet-token-icons-main/ethLogo.png";
import { StaticImageData } from "next/image";
import { formatEther, parseEther, parseUnits } from "viem";
import { useAccount } from "wagmi";

type tokenData = {
  icon: StaticImageData;
  name: string;
  ca: string;
  ticker: string;
  tokenBalance: number | undefined;
  inputValue: string;
};
interface IProps {
  setToggleModal: (val: any) => void;
  ToggleModal: boolean;
  baseToken?: tokenData;
  setBaseToken?: any;
  isLoading: boolean;
}
const TopSwap = ({
  setToggleModal,
  ToggleModal,
  baseToken,
  setBaseToken,
  isLoading,
}: IProps) => {
  const { isConnected } = useAccount();
  const setPercentage = useCallback(
    (percent: number) => {
      setBaseToken((prev: { tokenBalance: any }) => {
        if (prev) {
          return {
            ...prev,
            inputValue: Number(
              formatEther(BigInt(((prev.tokenBalance || 0) * percent) / 100))
            )?.toFixed(3),
          };
        }
        return prev;
      });
    },
    [setBaseToken]
  );

  // -------toggle on modal
  const handleModal = useCallback(() => {
    setToggleModal({ mainToggle: true, forBase: true });
  }, [setToggleModal]);

  // this is to input basequote typed in by user
  const hanldeBaseInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      // Regular expression to validate numbers with optional decimal point
      const regex = /^\d*\.?\d*$/;
      if (newValue === "" || regex.test(newValue)) {
        // If the input is a valid number or empty, update the state
        setBaseToken((prev: any) => ({
          ...prev,
          inputValue: newValue,
        }));
      }
    },
    [setBaseToken]
  );

  return (
    <div className=" h-[144.25px] py-4 px-[14px] rounded-[10px] border-1-[#000000] shadow-sm border border-[#7a1b84] bg-mainBG cursor-default ">
      <div className=" flex justify-between items-center h-[40px]">
        <input
          type="text"
          placeholder="0.0"
          value={baseToken?.inputValue ? baseToken.inputValue : ""}
          onChange={hanldeBaseInput}
          className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none"
        />
        <TokenButton
          logo={baseToken?.icon}
          token={baseToken?.ticker}
          handleModal={handleModal}
        />
      </div>

      <div className=" my-3 text-[13px] flex justify-between items-center text-textFaint">
        {/* this shows the balances of the top token */}
        {baseToken?.inputValue ? <p>{"$" + baseToken?.inputValue}</p> : <p></p>}
        <div className=" flex gap-2 items-center">
          {isConnected && baseToken?.name ? (
            <>
              <p>Balance</p>
              <p>
                {isLoading
                  ? "loading"
                  : baseToken?.tokenBalance
                  ? Number(
                      formatEther(BigInt(baseToken?.tokenBalance))
                    )?.toFixed(3)
                  : "0.000"}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <PercentSection setPercentage={setPercentage} />
    </div>
  );
};

export default TopSwap;

const PercentSection = ({ setPercentage }: any) => {
  return (
    <div className=" flex justify-between h-[30.75px]">
      {[25, 50, 75, 100].map((_percent) => (
        <button
          key={_percent}
          onClick={() => setPercentage(_percent)}
          className=" w-[75px] border-[0.8px] border-slate-400 rounded-lg border-darkBG px-[9px] py-[3px] md:w-[97px] text-slate-400 hover:text-white hover:border-white transition-colors ease-linear duration-200 "
        >
          {_percent + "%"}
        </button>
      ))}
    </div>
  );
};
