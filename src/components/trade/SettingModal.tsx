import { motion } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { IoClose } from "react-icons/io5";

const SettingModal = ({ setSettingToggle }: any) => {
	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			exit={fadeIn.initial}
			onClick={() => setSettingToggle(false)}
			className=" w-dvw h-dvh bg-black bg-opacity-90 md:p-6 fixed top-0 z-50 grid place-content-center"
		>
			<section className=" h-[300px] md:w-[500px] border-[0.5px] border-mainFG bg-mainDark md:rounded-[30px] flex flex-col mx-auto ">
				<div className=" flex items-center justify-between border-b border-mainFG p-4">
					<h2 className=" font-semibold text-[20px] ">Swap Settings</h2>
					<button className=" bg-mainLight py-2 px-4 rounded-md lg:hover:bg-mainFG ease-linear duration-200 transition-colors ">
						<IoClose />
					</button>
				</div>
			</section>
		</motion.main>
	);
};

export default SettingModal;
