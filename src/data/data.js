import {
	BsFacebook,
	BsInstagram,
	BsYoutube,
	BsTwitter,
	BsGithub,
	BsLinkedin,
} from "react-icons/bs";
import { SiTiktok } from "react-icons/si";

export const categories = [
	{ label: "Adventure", value: "Adventure" },
	{ label: "Cosplay", value: "Cosplay" },
	{ label: "Educational", value: "Educational" },
	{ label: "Festival", value: "Festival" },
	{ label: "History", value: "History" },
	{ label: "Literature", value: "Literature" },
	{ label: "Science", value: "Science" },
	{ label: "Social", value: "Social" },
	{ label: "Sports", value: "Sports" },
	{ label: "Technology", value: "Technology" },
	{ label: "Other", value: "Other" },
];

export const connectIcons = {
	facebook: <BsFacebook className="w-7 h-7 text-[#3b5998]" />,
	instagram: <BsInstagram className="w-7 h-7 text-[#FD1D1D]" />,
	youtube: <BsYoutube className="w-7 h-7 text-[#ff0000]" />,
	twitter: <BsTwitter className="w-7 h-7 text-[#1da1f2]" />,
	linkedIn: <BsLinkedin className="w-7 h-7 text-[#0a66c2]" />,
	github: <BsGithub className="w-7 h-7 text-[#171515]" />,
	tiktok: <SiTiktok className="w-7 h-7 text-[#010101]" />,
};
