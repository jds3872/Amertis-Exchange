import { StaticImageData } from "next/image";
import TokenButton from "./TokenButton";
import usdcLogo from "/public/Images/testnet-token-icons-main/usdcLogo.png";
import { formatEther } from "viem";
import { useCallback } from "react";
import { useAccount } from "wagmi";

type tokenData = {
  icon: StaticImageData;
  name: string;
  ticker: string;
  ca: string;
  tokenBalance: number | undefined;
  inputValue: string;
};
interface IProps {
  setToggleModal: (val: any) => void;
  ToggleModal: boolean;
  quoteToken?: tokenData;
  setQuoteToken?: any;
  isLoading: boolean;
}
const BottomSwap = ({
  setToggleModal,
  ToggleModal,
  quoteToken,
  setQuoteToken,
  isLoading,
}: IProps) => {
  const { isConnected } = useAccount();

  // -------toggle on modal and set "false" as
  const handleModal = useCallback(() => {
    setToggleModal({ mainToggle: true, forBase: false });
  }, [setToggleModal]);

  // this is to input basequote typed in by user
  const hanldeQuoteInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      if (quoteToken) {
        setQuoteToken((prev: any) => ({
          ...prev,
          inputValue: newValue,
        }));
      }
    },
    [setQuoteToken]
  );

  return (
    <div className=" h-[104px] py-4 px-[14px] border border-[#8F199B] rounded-[10px] shadow-sm  bg-mainBG">
      <div className=" flex justify-between items-center h-[40px]">
        {" "}
        {/* this is the bottom input */}
        <input
          type="text"
          placeholder="0"
          value={quoteToken?.inputValue ? quoteToken.inputValue : ""}
          //   value={quoteInput ? quoteInput : ""}
          onChange={hanldeQuoteInput}
          className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none web "
        />
        <TokenButton
          logo={quoteToken?.icon}
          token={quoteToken?.ticker}
          handleModal={handleModal}
        />
      </div>

      <div className="mt-3 text-[13px] flex justify-between items-center text-textFaint">
        {/* this shows the balances of the bottom token */}
        {quoteToken?.inputValue ? (
          <p>{"$" + quoteToken?.inputValue}</p>
        ) : (
          <p></p>
        )}
        <div className=" flex gap-2 items-center">
          {isConnected && quoteToken?.name ? (
            <>
              <p>Balance</p>
              <p>
                {isLoading
                  ? ""
                  : quoteToken?.tokenBalance
                  ? Number(
                      formatEther(BigInt(quoteToken?.tokenBalance))
                    )?.toFixed(3)
                  : "0.000"}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomSwap;
