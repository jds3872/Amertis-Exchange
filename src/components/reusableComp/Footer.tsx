import Image from "next/image";
import Icon from "/public/Images/Logo.svg";

import { BsTwitterX, BsGithub, BsDiscord } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
	return (
		<footer className=" border-t-[0.5px] border-[rgba(255,255,255,0.2)] h-[70px] p-2 flex items-center justify-center gap-4 md:gap-7 text-2xl">
			<div className=" items-center hidden md:flex gap-2">
				<Image src={Icon} alt="" className=" h-7 w-7" />
				<h1 className=" font-bold ">AMERTIS</h1>
			</div>
			{footerLinks.map((_link) => (
				<a
					key={_link.linkName}
					href={_link.linkHref}
					target="_blank"
					className=" hover:bg-mainFG duration-200 ease-linear transition-colors h-[40px] w-[40px] bg-mainLight rounded-full grid place-content-center p-1"
				>
					{_link.linkIcon}
				</a>
			))}
		</footer>
	);
}

export default Footer;

const footerLinks = [
	{
		linkName: "Twitter",
		linkIcon: <BsTwitterX />,
		linkHref: "https://discord.com/monag",
	},
	{
		linkName: "Telegram",
		linkIcon: <FaTelegramPlane />,
		linkHref: "https://telegram.com/monag",
	},
	{
		linkName: "GitHub",
		linkIcon: <BsGithub />,
		linkHref: "https://github.com/monag",
	},
	{
		linkName: "Discord",
		linkIcon: <BsDiscord />,
		linkHref: "https://telegram.com/monag",
	},
];
