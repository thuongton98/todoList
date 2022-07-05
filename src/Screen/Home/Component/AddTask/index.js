import React, { useState, useEffect } from "react";
import s from "./addTask.module.css";

function AddTask({ close, isUpdate, value, isKey, check }) {
	const [day, setDay] = useState(new Date());
	const fomatDate = (e) => {
		let optionsM = {
			month: "long",
		};
		let optionsY = {
			year: "numeric",
		};
		let optionsD = {
			day: "numeric",
		};
		setDay(
			`${new Date(e).toLocaleDateString("en-US", optionsD)} ${new Date(
				e
			).toLocaleDateString("en-US", optionsM)} ${new Date(
				e
			).toLocaleDateString("en-US", optionsY)}`
		);
		return `${new Date(e).toLocaleDateString("en-US", optionsD)} ${new Date(
			e
		).toLocaleDateString("en-US", optionsM)} ${new Date(
			e
		).toLocaleDateString("en-US", optionsY)}`;
	};
	useEffect(() => {
		if (isUpdate) {
			setDay(value.duedate);
		} else {
			fomatDate(new Date());
		}
	}, [isUpdate, value]);
	const add = (v) => {
		if (isUpdate) {
			const task = JSON.parse(localStorage.getItem("task"));
			if (task) {
				const updateTask = {
					title: v.target[0].value,
					description: v.target[1].value,
					duedate: v.target[2].value,
					piority: v.target[4].value,
				};
				let taskNew = task;
				check([], false);
				taskNew[isKey] = updateTask;
				localStorage.setItem("task", JSON.stringify(taskNew));
				close();
			}
		} else {
			const task = JSON.parse(localStorage.getItem("task"));
			if (!task) {
				const t = [];
				const newTask = {
					title: v.target[0].value,
					description: v.target[1].value,
					duedate: v.target[2].value,
					piority: v.target[4].value,
				};
				check(newTask, false);
				t.push(newTask);
				localStorage.setItem("task", JSON.stringify(t));
				close();
			} else {
				const t = task;
				const newTask = {
					title: v.target[0].value,
					description: v.target[1].value,
					duedate: v.target[2].value,
					piority: v.target[4].value,
				};
				check(newTask, false);
				t.push(newTask);
				localStorage.setItem("task", JSON.stringify(t));
				close();
			}
		}
	};
	const checkDayPast = () => {
		const p = new Date().toISOString().split("T")[0];
		return p;
	};
	return (
		<div>
			<form
				className={s.form}
				onSubmit={(e) => {
					add(e);
					e.preventDefault();
				}}
			>
				<input
					className={s.text}
					type="text"
					placeholder="Add new task ..."
					defaultValue={isUpdate ? value.title : ""}
					required
				/>
				<div className={s.des}>
					<label htmlFor="des">Description</label>

					<textarea
						defaultValue={isUpdate ? value.description : ""}
						id="des"
						name="des"
					/>
				</div>
				<div className={s.flex_item}>
					<div className={s.due}>
						<label htmlFor="due">Due date:</label>
						<input type="text" value={day} readOnly />
						<input
							type="date"
							onChange={(e) => {
								fomatDate(e.target.value);
							}}
							id="due"
							name="due"
							min={checkDayPast()}
						/>
					</div>
					<div className={s.piority}>
						<label htmlFor="piority">Piority:</label>

						<select
							defaultValue={isUpdate ? value.piority : "normal"}
							name="piority"
							id="piority"
						>
							<option value="low">Low</option>
							<option value="normal">Normal</option>
							<option value="high">High</option>
						</select>
					</div>
				</div>
				<input
					className={`${s.add} ${s.submit}`}
					type="submit"
					value={isUpdate ? "Update" : "Add"}
				/>
				<input
					onClick={() => close()}
					className={`${s.cancel} ${s.submit}`}
					type="submit"
					value="Cancel"
				/>
			</form>
		</div>
	);
}

export default AddTask;
