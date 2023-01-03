import logo from "../logo.jpg";
import { Link } from "react-router-dom";

const Brand = () => {
	return (
		<Link to="/home" className="items-center flex">
			<img src={logo} alt="EventTrace" className="h-6 mr-3" />
			<span className="md:text-2xl text-xl font-semibold whitespace-nowrap text-[#0A1C5C]">
				EventTrace
			</span>
		</Link>
	);
};

export default Brand;
