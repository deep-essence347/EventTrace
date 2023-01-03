import SideBar from "../../components/SideBar";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const Userdashboard = () => {
	return (
		<Layout hasSider className="h-full">
			<SideBar />
			<Content className="lg:w-full lg:pl-[225px] py-10 h-full">
				<Outlet />
			</Content>
		</Layout>
	);
};

export default Userdashboard;
