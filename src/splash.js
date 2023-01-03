import { Spin } from "antd";
import React from "react";

export class SplashScreen extends React.Component {
	render() {
		return (
			<div className="flex h-full justify-center items-center">
				<Spin size="large" />
			</div>
		);
	}
}
