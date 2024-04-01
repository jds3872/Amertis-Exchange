import Image from "next/image";
import { GrDown } from "react-icons/gr";

const TokenButton = ({ logo, token, handleModal }: any) => {
	return (
		<button
			onClick={handleModal}
			className=" flex items-center justify-center gap-3 bg-mainFG lg:hover:bg-secFG active:bg-secFG transition-colors ease-linear duration-200 w-fit px-3 shadow-lg h-full rounded-3xl "
		>
			<Image src={logo} alt="" className=" h-6 w-6  " />
			<div className=" flex items-center gap-2">
				<h2 className=" ">{token}</h2>
				<GrDown className=" text-sm" />
			</div>
		</button>
	);
};

export default TokenButton;
