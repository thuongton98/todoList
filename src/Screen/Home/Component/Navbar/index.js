import React from "react";
import s from "./navbar.module.css";

function Navbar({ text }) {
	return <div className={s.title}>{text}</div>;
}

export default Navbar;
