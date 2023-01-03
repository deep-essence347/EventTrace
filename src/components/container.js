import React from "react";

export const Container = ({ children }) => {
	return (
		<div className="w-full h-full bg-[#FBFBFB] shadow-lg rounded px-5 py-4 text-left">
			{children}
		</div>
	);
};
