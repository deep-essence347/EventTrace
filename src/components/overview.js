import React from "react";

function DataOverview({ data }) {
	return (
		<div className="w-full h-full flex items-center justify-between px-4 xs:py-0 py-2">
			<div className="text-left pr-2">
				<h3 className="text-secondary text-2xl m-0">{data.count}</h3>
				<p className="text-secondary text-lg opacity-60 m-0">{data.title}</p>
			</div>
			{data.icon}
		</div>
	);
}

export const Overview = ({ dataList, className }) => {
	return (
		<div className={`w-full bg-primary rounded-lg px-2  ${className} py-4`}>
			<div
				className={`w-full h-full grid xs:grid-flow-col-dense xs:auto-cols-fr xs:divide-x-2 divide-x-0 grid-flow-row-dense auto-rows-fr xs:divide-y-0 divide-y-2 divide-secondary/[.10]`}
			>
				{dataList.map((data) => (
					<DataOverview data={data} />
				))}
			</div>
		</div>
	);
};
