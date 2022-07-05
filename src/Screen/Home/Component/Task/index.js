import React, { useEffect, useRef, useState } from "react";
import AddTask from "../AddTask";
import s from "./task.module.css";

function Task({ check, value, detail, remove, allCheck, isKey }) {
	let checkRef = useRef();
	const [showDetail, setShowDetail] = useState(false);
	useEffect(() => {
		if (allCheck?.length < 1) {
			checkRef.checked = false;
			setShowDetail(false);
		}
	}, [allCheck]);
	return (
		<>
			<div className={s.body}>
				<label className={s.checkbox}>
					<div>{value.title}</div>
					<input
						ref={(ref) => (checkRef = ref)}
						onClick={(e) => {
							check(value, e.target.checked);
						}}
						type="checkbox"
					/>
					<span className={s.checkmark}></span>
				</label>
				<div className={s.item}>
					<button
						onClick={() => {
							setShowDetail(true);
							checkRef.checked = true;
							check(value, true);
						}}
						className={s.detail}
					>
						Detail
					</button>
					<button
						onClick={() => remove(isKey, false)}
						className={s.remove}
					>
						Remove
					</button>
				</div>
			</div>
			{showDetail && (
				<div className={s.update}>
					<AddTask
						check={() => {
							check(value, false);
						}}
						isUpdate
						close={() => {
							setShowDetail(false);
						}}
						value={value}
						isKey={isKey}
					/>
				</div>
			)}
		</>
	);
}

export default Task;
