import TokenButton from "./TokenButton";
import usdcLogo from "/public/Images/testnet-token-icons-main/usdcLogo.png";

const BottomSwap = ({
	setToggleModal,
	quoteTokenData,
	setQuoteInput,
	quoteInputValue,
	quoteInput,
}: any) => {
	// -------toggle on modal and set "false" as
	const handleModal = () => {
		setToggleModal({ mainToggle: true, forBase: false });
	};

	// this is to input basequote typed in by user
	const hanldeBaseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value);
		setQuoteInput(newValue);
	};

	return (
		<div className=" h-[104px] py-4 px-[14px] border border-[#8F199B] rounded-[10px] shadow-sm  bg-mainBG">
			<div className=" flex justify-between items-center h-[40px]">
				{" "}
				{/* this is the bottom input */}
				<input
					type="number"
					placeholder="0.0"
					value={quoteInput ? quoteInput : ""}
					onChange={hanldeBaseInput}
					className=" bg-inherit h-full text-3xl w-[70%] focus:outline-none web "
				/>
				<TokenButton
					logo={quoteTokenData?.tokenIcon}
					token={quoteTokenData?.tokenName}
					handleModal={handleModal}
				/>
			</div>

			<div className="mt-3 text-[13px] flex justify-between items-center text-textFaint">
				{" "}
				{/* this shows the balances of the bottom token */}
				<p>{"$" + quoteInputValue}</p>
				<div className=" flex gap-2 items-center">
					<p>Balance</p>
					<p>{quoteTokenData?.tokenBalance}</p>
				</div>
			</div>
		</div>
	);
};

export default BottomSwap;