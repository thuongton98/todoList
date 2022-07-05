import React from "react";
import s from "./footer.module.css";

function Footer({ isAdd, add, noCheck, remove }) {
	return (
		<div className={s.body}>
			<div className={s.text}>Bulk Action:</div>
			<div className={s.center}>
				{!isAdd ? (
					<button onClick={() => add()} className={s.add}>
						Add
					</button>
				) : (
					<div className={s.item}>
						<button
							onClick={() => {
								noCheck();
							}}
							className={s.done}
						>
							Done
						</button>
						<button
							onClick={(e) => {
								remove(e, true);
							}}
							className={s.remove}
						>
							Remove
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Footer;
