import { Dispatch, SetStateAction } from "react";
import TokenButton from "./TokenButton";

import ethLogo from "/public/Images/testnet-token-icons-main/ethLogo.png";
import { StaticImageData } from "next/image";

type tokenData = {
  tokenIcon: StaticImageData;
  tokenName: string;
  tokenBalance: number;
  inputValue: string;
};
interface IProps {
  setToggleModal: (val: any) => void;
  ToggleModal: boolean;
  baseToken?: tokenData;
  quoteToken?: tokenData;
  setBaseToken?: any;
  setQuoteToken?: any;
}
const TopSwap = ({
  setToggleModal,
  ToggleModal,
  baseToken,
  setBaseToken,
}: IProps) => {
  const setPercentage = (percent: number) => {
    setBaseToken((prev: any) => {
      return { ...prev, inputValue: (prev.tokenBalance * percent) / 100 };
    });
  };

  // -------toggle on modal
  const handleModal = () => {
    setToggleModal({ mainToggle: true, forBase: true });
  };

  // this is to input basequote typed in by user
  const hanldeBaseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setBaseToken((prev: any) => {
      return { ...prev, inputValue: newValue };
    });
  };

  return (
    <div className=" h-[144.25px] py-4 px-[14px] rounded-[10px] border-1-[#000000] shadow-sm border border-[#7a1b84] bg-mainBG cursor-default ">
      <div className=" flex justify-between items-center h-[40px]">
        <input
          type="number"
          placeholder="0.0"
          value={baseToken?.inputValue ? baseToken.inputValue : ""}
          onChange={hanldeBaseInput}
          className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none"
        />
        <TokenButton
          logo={baseToken?.tokenIcon}
          token={baseToken?.tokenName}
          handleModal={handleModal}
        />
      </div>

      <div className=" my-3 text-[13px] flex justify-between items-center text-textFaint">
        {/* this shows the balances of the top token */}
        <p>{"$" + baseToken?.inputValue}</p>
        <div className=" flex gap-2 items-center">
          <p>Balance</p>
          <p>{baseToken?.tokenBalance}</p>
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
