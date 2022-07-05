import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Screen/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
