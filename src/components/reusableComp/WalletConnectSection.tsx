import { BsEggFill } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { fadeIn } from "@/utils/anim";

const WalletConnectSection = () => {
	return (
		<div className=" hidden md:flex items-center gap-2">
			<div className=" group relative cursor-pointer">
				<BsEggFill className=" shrink-0 text-2xl  " />

				<p className=" bg-mainLight p-1 absolute mx-auto top-[120%] left-[-100px] w-[200px] text-center hidden group-hover:block ">
					Mainnet Switch will be available in due time
				</p>
			</div>

			<ConnectButton />
		</div>
	);
};

export default WalletConnectSection;

export const ConnectButton = () => {
	return (
		<button className=" rounded-xl bg-mainFG py-2 px-4 flex items-center gap-2 justify-center mx-auto lg:hover:bg-secFG ">
			<IoWalletOutline className=" text-2xl" />
			Connect Wallet
		</button>
	);
};
