const IconedInfo = ({ value, icon }) => {
	return (
		<div className="flex mb-3">
			<span className="text-primary mr-2">{icon}</span>
			<span className="text-grey font-base font-semibold">{value}</span>
		</div>
	);
};

export const IconedInfoList = ({ list }) => {
	return (
		<div>
			{list.map((info) => (
				<IconedInfo key={info.value} value={info.value} icon={info.icon} />
			))}
		</div>
	);
};
