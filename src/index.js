import React from "react";
import ReactDOM from "react-dom";
import { EventTraceRouter } from "./router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "@themesberg/flowbite";
import "./App.less";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<EventTraceRouter />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
