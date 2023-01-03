import React from "react";

export const Badge = ({
	text,
	icon,
	absolute = true,
	position = "top-5 right-5",
	bgColor = "bg-primary",
	className,
}) => {
	return (
		<div
			className={`${
				absolute ? `absolute ${position}` : ""
			} rounded-full py-1 px-3 text-base text-center font-semibold text-white opacity-80 uppercase cursor-default ${bgColor} ${className}`}
		>
			{icon && <span className="inline-block px-2 text-white">{icon}</span>}
			{text}
		</div>
	);
};
